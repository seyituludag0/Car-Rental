import { CustomerService } from 'src/app/services/customerService/customer.service';
import { RentalService } from 'src/app/services/rentalService/rental.service';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/authService/auth.service';
import { UserService } from 'src/app/services/userService/user.service';
import { LocalStorageService } from 'src/app/services/localStrogeService/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  customerId:number
  currentUserId: number;
  user: UserModel;
  rentalDetails:RentalDetail[]
  rentalDetail:RentalDetail
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private rentalService:RentalService,
    private customerService:CustomerService,
  ) {}
  ngOnInit(): void {
    this.currentUserId = this.authService.getUserId();
    this.getCustomerUserId()
    this.getUserDetails();
  }
  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  getUserDetails() {
    this.userService.getById(this.currentUserId).subscribe((response) => {
      this.user = response.data;
    });
  }

  logout() {
    this.localStorageService.clear();
    location.reload();
  }

  getRentalDetailbyCustomerId(customerId:number){
    this.rentalService.getRentalDetailByCustomerId(customerId).subscribe(response=>{
      this.rentalDetails = response.data

    })
  }

  getCustomerUserId(){
    this.customerService.getCustomerByUserId(this.currentUserId).subscribe(response=>{
      this.customerId = response.data.id
    })
  }



}
