import { HomePageComponent } from './components/home-page/home-page.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactComponent } from './components/contact/contact.component';
import { MyRentalComponent } from './components/my-rental/my-rental.component';
import { OperationsComponent } from './components/operations/operations.component';
import { MyCardsComponent } from './components/my-cards/my-cards.component';
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './components/login/login.component';
import { CarAddComponent } from './components/car/car-add/car-add.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { BrandAddComponent } from './components/brand/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color/color-add/color-add.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CarDetailComponent } from './components/car/car-detail/car-detail.component';
import { ColorUpdateComponent } from './components/color/color-update/color-update.component';
import { CarUpdateComponent } from './components/car/car-update/car-update.component';
import { BrandUpdateComponent } from './components/brand/brand-update/brand-update.component';
import { SuccesssendemailComponent } from './components/contact/successSendEmail/successsendemail.component';

const routes: Routes = [
  {path:"",pathMatch:"full", component:HomePageComponent},
  {path:"cars", component:CarComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"car-detail/:carId", component:CarDetailComponent, canActivate:[LoginGuard]},
  {path:"cars/filter/:brandId/:colorId",component:CarComponent},
  {path:"brand/add", component:BrandAddComponent, canActivate:[LoginGuard]},
  {path:"color/add", component:ColorAddComponent, canActivate:[LoginGuard]},
  {path:"car/add", component:CarAddComponent, canActivate:[LoginGuard]},
  {path:"color/update/:id", component:ColorUpdateComponent, canActivate:[LoginGuard]},
  {path:"brand/update/:id", component:BrandUpdateComponent, canActivate:[LoginGuard]},
  {path:"car/update/:id", component:CarUpdateComponent, canActivate:[LoginGuard]},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"profile", component:ProfileComponent, canActivate:[LoginGuard]},
  {path:"payment/:rental",component:PaymentComponent},
  {path:"mycards", component:MyCardsComponent},
  {path:"operations", component:OperationsComponent},
  {path:"myrental/:customerId", component:MyRentalComponent},
  {path:"contact",component:ContactComponent},
  {path:"successsendemail",component:SuccesssendemailComponent},
  {path:"about", component:AboutUsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
