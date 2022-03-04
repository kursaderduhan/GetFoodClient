import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { CommonInformation } from '../entities/common-information';
import { GetFoodResponse } from '../entities/response';
import { DataTransferService } from './data-transfer.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private dataTransferService: DataTransferService,
    private router: Router) {

    this.commonInformationSubscription = this.dataTransferService.currentCommonInformation
      .subscribe((commonData) => this.commonInformation = commonData );

  }

  baseUrl:string = "https://localhost:44388/api/";


  subscription: Subscription = new Subscription();
  commonInformationSubscription: Subscription = new Subscription();
  commonInformation:CommonInformation = new CommonInformation();


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



  public getToken(): any {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {

    const token = this.getToken();
    return false;
  }



  public getUserFromApi(){
    return this.httpClient.get<GetFoodResponse>(this.baseUrl+"User/GetUser");
  }

  public removeOldToken(){
    localStorage.removeItem('token');
  }

  public logout(){
    this.removeOldToken();
    this.changeAuthenticationStatus(false);
    this.router.navigateByUrl("/");
  }




  getUser() {
    this.getUserFromApi().subscribe({
      next: (response) => {
        let newCommonInformation = new CommonInformation();

        console.log(response);
        if(response.statusCode == 200){
          newCommonInformation.firstName = response.data['customer']['firstName'];
          newCommonInformation.lastName = response.data['customer']['lastName'];
          this.changeCommonInformation(newCommonInformation);
        }else{
          this.logout();
          console.log("Can not find user");
        }




      },
      error: (msg) => {
        console.log(msg);
        if (msg['status'] == 401) {
          localStorage.removeItem('token');
          console.log('401 error');
        }
      },
    });
  }




}
