import { GetFoodResponse } from './../entities/response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  baseUrl:string = "https://localhost:44388/api/";


  orderFood(foodId:number){
    return this.httpClient.post<GetFoodResponse>(this.baseUrl+"Order/"+foodId, foodId);
  }

  getOrderHistory(){
    return this.httpClient.get<GetFoodResponse>(this.baseUrl+"Order");
  }


}
