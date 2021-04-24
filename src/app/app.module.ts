import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import { ContactService } from "./services/contactService/contact.service";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { NaviComponent } from './components/navi/navi.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { FilterBrandPipe } from './pipes/filter-brand.pipe';
import { FilterCarPipe } from './pipes/filter-car.pipe';
import { FilterColorPipe } from './pipes/filter-color.pipe';
import { CarAddComponent } from './components/car/car-add/car-add.component';
import { BrandAddComponent } from './components/brand/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color/color-add/color-add.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FooterComponent } from './components/footer/footer.component';
import { PaymentComponent } from './components/payment/payment.component';
import { SaveCardComponent } from './components/save-card/save-card.component';
import { MyCardsComponent } from './components/my-cards/my-cards.component';
import { BrandUpdateComponent } from './components/brand/brand-update/brand-update.component';
import { CarDetailComponent } from './components/car/car-detail/car-detail.component';
import { CarFilterComponent } from './components/car/car-filter/car-filter.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ColorUpdateComponent } from './components/color/color-update/color-update.component';
import { CarUpdateComponent } from './components/car/car-update/car-update.component';
import { CardwritePipe } from './pipes/cardwrite.pipe';
import { OperationsComponent } from './components/operations/operations.component';
import { HoldableDirective } from './directives/holdable.directive';
import { MyRentalComponent } from './components/my-rental/my-rental.component';
import { ContactComponent } from './components/contact/contact.component';
import { SuccesssendemailComponent } from './components/contact/successSendEmail/successsendemail.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    NaviComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    CarDetailComponent,
    FilterBrandPipe,
    FilterCarPipe,
    FilterColorPipe,
    CarFilterComponent,
    CarAddComponent,
    BrandAddComponent,
    ColorAddComponent,
    ColorUpdateComponent,
    BrandUpdateComponent,
    CarUpdateComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ChangePasswordComponent,
    FooterComponent,
    PaymentComponent,
    SaveCardComponent,
    MyCardsComponent,
    CardwritePipe,
    OperationsComponent,
    HoldableDirective,
    MyRentalComponent,
    ContactComponent,
    SuccesssendemailComponent,
    AboutUsComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},
    ContactService
  ],
  bootstrap: [AppComponent],

})
export class AppModule {}
