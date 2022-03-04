import { DataTransferService } from './../../services/data-transfer.service';
import { LoginService } from './../../services/login.service';
import { LoginForm } from './../../entities/loginform';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonInformation } from 'src/app/entities/common-information';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });


  constructor(private loginService: LoginService, private dataTransferService: DataTransferService,
    private router: Router, private authService: AuthService) { }

  ngOnInit(): void {


    this.commonInformationSubscription = this.dataTransferService.currentCommonInformation
      .subscribe((commonData) => this.commonInformation = commonData );


  }

  subscription: Subscription = new Subscription();
  commonInformationSubscription: Subscription = new Subscription();
  commonInformation:CommonInformation = new CommonInformation();


  loginFormSubmit() {

    let newLoginForm = new LoginForm();
    newLoginForm.email = this.loginForm.controls['email'].value;
    newLoginForm.password = this.loginForm.controls['password'].value;

    this.loginService.postLoginForm(newLoginForm).subscribe((response) => {
      console.log(response);
      let token = response.data['accessToken'];
      console.log(response.data['accessToken']);
      localStorage.setItem('token', token);
      this.changeAuthenticationStatus();
      this.getUser();
      this.router.navigateByUrl("/");
    } )

  }

  changeAuthenticationStatus(){
    let newInformation = this.commonInformation;
    newInformation.isAuthenticated = true;
    this.dataTransferService.changeCommonInformation(newInformation);
  }




  changeCommonInformation(input: CommonInformation){
    let newInformation = this.commonInformation;
    newInformation.isAuthenticated = true;
    newInformation.firstName = input.firstName;
    newInformation.lastName = input.lastName;
    this.dataTransferService.changeCommonInformation(newInformation);

  }



  getUser() {
    this.authService.getUserFromApi().subscribe({
      next: (response) => {
        let newCommonInformation = new CommonInformation();

        newCommonInformation.firstName = response.data['customer']['firstName'];
        newCommonInformation.lastName = response.data['customer']['lastName'];
        this.changeCommonInformation(newCommonInformation);

      },
      error: (msg) => {
        console.log(msg);
        if (msg['status'] == 401) {
          localStorage.removeItem('token');
          console.log('401 hatası');
        }
      },
    });
  }











}
