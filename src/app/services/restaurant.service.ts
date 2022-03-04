import { Restaurant } from './../entities/restaurant';
import { GetFoodResponse } from './../entities/response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  baseUrl:string = "https://localhost:44388/api/";

  constructor(private httpClient: HttpClient) { }


  listRestaurantByLocation(){
    return this.httpClient.get<GetFoodResponse>(this.baseUrl+"Restaurant/GetRestaurantsByLocation"+"/1");
  }

  tokenTest(){
    return this.httpClient.get<GetFoodResponse>(this.baseUrl+"User/GetUser");
  }

  getRestaurantOfUser(){
    return this.httpClient.get<GetFoodResponse>(this.baseUrl+"User/GetRestaurantOfUser");
  }

  bindRestaurantToUser(model:any){
    return this.httpClient.post<GetFoodResponse>(this.baseUrl+"User/BindRestaurant", model);
  }

  addFoodToRestaurant(model:any){
    return this.httpClient.post<GetFoodResponse>(this.baseUrl+"Restaurant/AddFood", model);
  }

  getFoodsOfRestaurant(restaurantId:number){
    return this.httpClient.get<GetFoodResponse>(this.baseUrl+"Restaurant/GetFoodsOfRestaurant/"+restaurantId);
  }

  getRestaurantById(restaurantId:number){
    return this.httpClient.get<GetFoodResponse>(this.baseUrl+"Restaurant/GetRestaurantById/"+restaurantId);
  }




}
