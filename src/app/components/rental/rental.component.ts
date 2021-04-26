import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rental';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CarDetail } from 'src/app/models/car/carDetail';
import { Car } from 'src/app/models/car/car';
import { DatePipe } from '@angular/common';
import { CustomerService } from 'src/app/services/customerService/customer.service';
import { CarDetailService } from 'src/app/services/carDetailService/car-detail.service';
import { UserService } from 'src/app/services/userService/user.service';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
  providers: [DatePipe],
})
export class RentalComponent implements OnInit {
  customers: Customer[];
  carDetail: CarDetail;
  id: number; //customer

  @Input() car: Car;
  userFindex: number;

  minDate: string | null;
  maxDate: string | null;
  rentDate: Date;
  returnDate: Date;
  firstDateSelected: boolean = false;

  constructor(
    private customerService: CustomerService,
    private carDetailService: CarDetailService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private userService: UserService,
    private authService: AuthService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetails(params['carId']);
        this.getCustomer();
        this.getUserFindex();
      }
    });

    this.minDate=this.datePipe.transform(new Date(),"yyyy-MM-dd");
    this.maxDate=this.datePipe.transform(new Date(new Date().setFullYear(new Date().getFullYear() + 1)),"yyyy-MM-dd");
  }

  getCustomer() {
    this.customerService.listCustomer(this.authService.userId).subscribe(response=>{
      this.customers = response.data
    })
  }

  getCarDetails(carId: number) {
    this.carDetailService.getCarDetail(carId).subscribe((response) => {
      this.carDetail = response.data;
    });
  }

  getRentMinDate() {
    var today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().slice(0, 10);
  }
  getReturnMinDate() {
    var today = new Date();
    today.setDate(today.getDate() + 2);
    return today.toISOString().slice(0, 10);
  }

  createRental() {
    let rental: Rental = {
      rentDate: this.rentDate,
      returnDate: this.returnDate,
      carId: this.carDetail.id,
      customerId: parseInt(this.id.toString()),
    };
    this.router.navigate(['payment/', JSON.stringify(rental)]);
    this.toastrService.info(
      'Ödeme sayfasına yönlendiriliyorsunuz...',
      'Ödeme İşlemleri'
    );
  }

  onChangeEvent(event: any) {
    this.minDate = event.target.value;
    this.firstDateSelected = true;
  }
  checkReturnDate() {
    if (this.returnDate < this.rentDate) {
      this.returnDate = this.rentDate;
    }
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

      let result =(returnDay - rentDay + (returnMonth - rentMonth) * 30 + (returnYear - rentYear) * 365+ 1 ) * this.carDetail.dailyPrice;

      if (result > 0) {
        return result;
      }
      this.toastrService.info(
        'Bu tarihler arasında arabayı kiralayamazsınız',
        'Geçersiz tarih seçimi'
      );
      return 0;
    } else {
      return this.carDetail.dailyPrice;
    }
  }

  getUserFindex() {
    this.userService
      .getUserFindexByUserId(this.authService.getUserId())
      .subscribe((response) => {
        this.userFindex = response.data.findex;
      });
  }
}
