import { RestaurantService } from './../../services/restaurant.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'],
})
export class FoodComponent implements OnInit {
  constructor(private restaurantService: RestaurantService) {}

  ngOnInit(): void {

    this.restaurantService.listRestaurantByLocation().subscribe((response) => {
      console.log(response.data);
      this.restaurantList = response.data;
    });


    /*
    this.restaurantService.tokenTest().subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    */


    this.restaurantService.tokenTest().subscribe({
      next(response){
        console.log(response);
      },
      error(msg){
        console.log(msg);
        if(msg['status'] == 401){
          console.log("401 hatası");
        }
      }
    });




/*
    const locationsSubscription = locations.subscribe({
      next(position) {
        console.log('Current Position: ', position);
      },
      error(msg) {
        console.log('Error Getting Location: ', msg);
      }
    });
*/


  }

  tempList = [1, 2, 3, 4, 5];

  restaurantList = [];
}
