import { CommonInformation } from './../entities/common-information';
import { DataTransferService } from './../services/data-transfer.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService, private dataTransferService: DataTransferService) {
  }

  ngOnInit(): void {
    if(localStorage.getItem('token') != null){
      this.changeAuthenticationStatus(true);
      this.authService.getUser();
      //this.getUser();
    }


    this.commonInformationSubscription = this.dataTransferService.currentCommonInformation
      .subscribe((commonData) => this.commonInformation = commonData );

  }


  username = 'deneme';
  isAuthenticated = false;




  subscription: Subscription = new Subscription();
  commonInformationSubscription: Subscription = new Subscription();
  commonInformation:CommonInformation = new CommonInformation();



  changeteststring(){
    this.changeAuthenticationStatus(true);
  }

  changeAuthenticationStatus(inputBoolean: boolean){
    let newInformation = this.commonInformation;
    newInformation.isAuthenticated = inputBoolean;
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
          this.isAuthenticated = false;
          localStorage.removeItem('token');
          console.log('401 error');
        }
      },
    });
  }


  logout(){
    this.authService.logout();
    this.isAuthenticated = false;
    console.log("logout");
  }



}
