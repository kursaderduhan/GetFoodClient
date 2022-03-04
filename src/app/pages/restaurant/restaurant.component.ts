import { OrderService } from './../../services/order.service';
import { Restaurant } from './../../entities/restaurant';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {

  constructor(private route: ActivatedRoute, private restaurantService : RestaurantService,
    private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.paramMap.get('restaurantId');

    this.getRestaurantById(this.restaurantId);

  }


  restaurantId : any = 0;

  tempList = [1,2,3,4,5,6,7,8];

  restaurantInformation:any;
  restaurantName:string = "";

  foodList = [];



  getRestaurantById(restaurantId:number){
    this.restaurantService.getRestaurantById(restaurantId).subscribe((response) => {

      this.restaurantName = response.data['restaurantName'];
      this.getFoodsOfRestaurant(restaurantId);

    });
  }

  getFoodsOfRestaurant(restaurantId:number){
    this.restaurantService.getFoodsOfRestaurant(restaurantId).subscribe((response) => {

      //console.log(response);
      this.foodList = response.data;

    });
  }


  orderFood(foodId:number){
    this.orderService.orderFood(foodId).subscribe((response) => {
      console.log(response);
      this.router.navigateByUrl("/");
    });
  }



}
