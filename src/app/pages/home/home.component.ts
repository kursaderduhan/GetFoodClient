import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonInformation } from 'src/app/entities/common-information';
import { DataTransferService } from 'src/app/services/data-transfer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dataTransferService: DataTransferService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.commonInformationSubscription = this.dataTransferService.currentCommonInformation
      .subscribe((commonData) => this.commonInformation = commonData );

    this.getOrderHistory();
  }


  orderHistory = [];

  searchString:string = "";

  commonInformationSubscription: Subscription = new Subscription();
  commonInformation:CommonInformation = new CommonInformation();



  getOrderHistory(){
    this.orderService.getOrderHistory().subscribe((response) => {
      console.log(response);
      this.orderHistory = response.data;
    });
  }


}
