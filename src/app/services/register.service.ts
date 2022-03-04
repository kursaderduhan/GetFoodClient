import { RegisterForm } from './../entities/registerform';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetFoodResponse } from '../entities/response';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  baseUrl:string = "https://localhost:44388/api/";

  constructor(private http: HttpClient) { }


  postRegisterForm(model:any){
    return this.http.post<GetFoodResponse>(this.baseUrl+"User/Register", model);

  }


}
