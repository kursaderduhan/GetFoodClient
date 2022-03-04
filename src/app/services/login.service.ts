import { LoginForm } from './../entities/loginform';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetFoodResponse } from '../entities/response';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl: string = 'https://localhost:44388/api/';

  constructor(private http: HttpClient) {}

  postLoginForm(model:any){
    return this.http.post<GetFoodResponse>(this.baseUrl+"User/Login", model);
  }


}
