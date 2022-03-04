import { RestaurantService } from './../../services/restaurant.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurant-owner',
  templateUrl: './restaurant-owner.component.html',
  styleUrls: ['./restaurant-owner.component.scss']
})
export class RestaurantOwnerComponent implements OnInit {

  constructor(private restaurantService : RestaurantService) { }

  ngOnInit(): void {
    this.getRestaurantOfUser();
  }

  haveRestaurant : boolean = false;
  restaurantName : string = "";
  restaurantId : number = 0;

  inputRestaurantName : string = "";

  inputFoodName : string = "";
  inputFoodPrice : number = 0;

  tempList = [1,2,3,4,5,6,7,8];

  foodListOfRestaurant = [];


  getRestaurantOfUser(){
    this.restaurantService.getRestaurantOfUser().subscribe((response) => {
      if(response.data == null){
        this.haveRestaurant = false;
      }else{
        console.log("Get restaurant of user"+response.data['restaurantName']);
        this.haveRestaurant = true;
        this.restaurantName = response.data['restaurantName'];
        this.restaurantId = response.data['restaurantId'];
        this.getFoodsOfRestaurant();
      }

    });
  };


  bindRestaurantToUser(){
    let newRestaurant = {'restaurantName' : this.inputRestaurantName}
    this.restaurantService.bindRestaurantToUser(newRestaurant).subscribe((response) => {
      console.log(response);
      if(response.statusCode == 200){
        //this.haveRestaurant = true;
        this.getRestaurantOfUser();
      }
    });
  }

  addFoodToRestaurant(){
    let newFood = {'foodName': this.inputFoodName, 'price': this.inputFoodPrice};
    this.restaurantService.addFoodToRestaurant(newFood).subscribe((response) => {
      console.log(response);
      this.getFoodsOfRestaurant();
    });
  }


  getFoodsOfRestaurant(){
    this.restaurantService.getFoodsOfRestaurant(this.restaurantId).subscribe((response) => {
      //console.log(response);
      this.foodListOfRestaurant = response.data;
    });
  }


}
