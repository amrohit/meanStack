import { AbstractControl } from "@angular/forms";
import { Observable, Observer } from "rxjs";

export const mimeType = (
  control: AbstractControl
): Promise<{ [key: string]: any }> | Observable<{ [key: string]: string }> => {
  const file = control.value as File;
  const fileReader = new FileReader();
  const frObs = Observable.create(
    (observer: Observer<{ [key: string]: string }>) => {
      //equivalent to fileReader.onload
      //the difference bwt onload and loadend is it provides more infos about file
      fileReader.addEventListener("loadend", () => {
        //we will check here if the file is valid or not
        //creating 8 bit of unsigned integers
        /*you can think of this as it allows us to  read certain pattern in
        the file not just in file but also in file meta data which we can
        use to parse the mime type, because we dont just want to check the
        file extension that could be changed, we could upload a pdf jpeg
        file we could really infer the file by looking in the file and Uint8Array and so we read this in ArrayBuffer so we could convert that in such Uint8Array   */
        const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(
          0,
          4
        );
        let header = "";
        let isValid = false;
        for (let i = 0; i < arr.length; i++) {
          header += arr[i].toString(16); //converting it to hexadecimal string
        }
        switch (header) {
          case "89504e47":
            isValid = true;
            break;
          case "ffd8ffe0":
          case "ffd8ffe1":
          case "ffd8ffe2":
          case "ffd8ffe3":
          case "ffd8ffe8":
            isValid = true;
            break;
          default:
            isValid = false; // Or you can use the blob.type as fallback
            break;
        }
        if (isValid) {
          observer.next(null); //it is valid(so returning null)
        } else {
          observer.next({ invalidMimeType: true }); //any erro code with js object
        }
        observer.complete();
      });
      //allow us to access the mime type
      //when it done loading file under generic buffer, then above function will be called
      fileReader.readAsArrayBuffer(file);
    }
  );
  return frObs;
};
