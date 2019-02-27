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
      });
      //allow us to access the mime type
      //when it done loading file under generic buffer, then above function will be called
      fileReader.readAsArrayBuffer(file);
    }
  );
};
