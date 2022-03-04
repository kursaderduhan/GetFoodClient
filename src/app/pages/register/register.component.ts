import { AuthService } from 'src/app/services/auth.service';
import { RegisterService } from './../../services/register.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterForm } from 'src/app/entities/registerform';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    phoneNumber: new FormControl(null, Validators.required),
    province: new FormControl(1, Validators.required),
    address: new FormControl(null, Validators.required),
  });




  constructor(private registerService: RegisterService, private authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {}


  registerFormSubmit() {
    this.registerForm.markAllAsTouched();

    let newRegisterForm = new RegisterForm();
    newRegisterForm.email = this.registerForm.controls['email'].value;
    newRegisterForm.password = this.registerForm.controls['password'].value;
    newRegisterForm.customer.firstName =
      this.registerForm.controls['firstName'].value;
    newRegisterForm.customer.lastName =
      this.registerForm.controls['lastName'].value;
    newRegisterForm.customer.phoneNumber =
      this.registerForm.controls['phoneNumber'].value;
    newRegisterForm.customer.provinceId =
      this.registerForm.controls['province'].value;
    newRegisterForm.customer.address =
      this.registerForm.controls['address'].value;

    //temp
    // newRegisterForm.email = 'alper2';
    // newRegisterForm.password = '123';
    // newRegisterForm.customer.firstName = 'angu';
    // newRegisterForm.customer.lastName = 'lar';
    // newRegisterForm.customer.phoneNumber = 505;
    // newRegisterForm.customer.provinceId = 3;
    // newRegisterForm.customer.address = 'angular address';

    if (this.registerForm.valid ) {

      this.registerService
        .postRegisterForm(newRegisterForm)
        .subscribe((response) => {
          console.log(response);
          let token = response.data['accessToken'];
          console.log(response.data['accessToken']);
          localStorage.setItem('token', token);
          this.authService.changeAuthenticationStatus(true);
          this.authService.getUser();
          this.router.navigateByUrl("/");

        });

    }else{
      console.log("Form not completed");
    }

    console.log(newRegisterForm);
  }








}
