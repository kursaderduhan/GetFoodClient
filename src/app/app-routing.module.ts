import { RestaurantOwnerComponent } from './pages/restaurant-owner/restaurant-owner.component';
import { RestaurantComponent } from './pages/restaurant/restaurant.component';
import { AboutComponent } from './pages/about/about.component';
import { FoodComponent } from './pages/food/food.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'home', component : HomeComponent},
  {path: 'register', component : RegisterComponent},
  {path: 'login', component : LoginComponent},
  {path: 'contact', component : ContactComponent},
  {path: 'about', component : AboutComponent},
  {path: 'restaurant-owner', component : RestaurantOwnerComponent},
  {path: 'food', component : FoodComponent},
  {path: 'food/:foodname', component : FoodComponent},
  {path: 'restaurant/:restaurantId', component : RestaurantComponent},
  {path: '', component : HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
