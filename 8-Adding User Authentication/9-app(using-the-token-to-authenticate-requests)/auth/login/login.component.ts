import { AuthService } from "./../auth.service";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onLogin(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      return;
    }
    this.authService.login(form.value.email, form.value.password);
  }
}
