import { ActivatedRoute } from '@angular/router';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { RentalService } from 'src/app/services/rentalService/rental.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-rental',
  templateUrl: './my-rental.component.html',
  styleUrls: ['./my-rental.component.css'],
})
export class MyRentalComponent implements OnInit {
  rentalDetails: RentalDetail[];
  rentalDetail: RentalDetail;
  now: Date = new Date();
  returnDate: Date;
  rentDate: Date;

  constructor(
    private rentalService: RentalService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['customerId']) {
        this.getRentalDetailbyCustomerId(params['customerId']);
      }
    });
    this.calculatePrice()
  }

  getRentalDetailbyCustomerId(customerId: number) {
    this.rentalService
      .getRentalDetailByCustomerId(customerId)
      .subscribe((response) => {
        this.rentalDetails = response.data;
        // console.log('====================================');
        // console.log(response.data);
        // console.log('====================================');
      });
  }

  calculatePrice() {
    if (this.returnDate) {
      let returnDate = new Date(this.returnDate.toString());
      let rentDate = new Date(this.rentDate.toString());

      let returnDay = Number.parseInt(returnDate.getDate().toString());
      let rentDay = Number.parseInt(rentDate.getDate().toString());

      let returnMonth = Number.parseInt(returnDate.getMonth().toString());
      let rentMonth = Number.parseInt(rentDate.getMonth().toString());

      let returnYear = Number.parseInt(returnDate.getFullYear().toString());
      let rentYear = Number.parseInt(rentDate.getFullYear().toString());

      let result =(returnDay - rentDay + (returnMonth - rentMonth) * 30 + (returnYear - rentYear) * 365+ 1 ) * this.rentalDetail.dailyPrice;

      if (result > 0) {
        return result;
      }
      return 0;
    } else {
      return this.rentalDetail.dailyPrice;
    }

  }


}
