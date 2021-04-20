import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CarImage } from 'src/app/models/car/carImage';
import { CarDetail } from 'src/app/models/car/carDetail';
import { CarDetailService } from 'src/app/services/carDetailService/car-detail.service';
import { UserService } from 'src/app/services/userService/user.service';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  baseUrl = 'https://localhost:44357/uploads/carImages/'
  carDetail: CarDetail;
  userFindex:number
  carImage: CarImage[] = [];
  defaultImg = "defaultimage.png"

  constructor(
    private carDetailService: CarDetailService,
    private activatedRoute: ActivatedRoute,
    private userService:UserService,
    private authService:AuthService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetail(params['carId']);
        this.getCarImages(params['carId']);
        this.getUserFindex();
      }
    });
  }

  getCarDetail(carId: number) {
    this.carDetailService.getCarDetail(carId).subscribe((response) => {
      this.carDetail = response.data;
    });
  }

  getCarImages(carId: number) {
    this.carDetailService.getCarImages(carId).subscribe((response) => {
      this.carImage = response.data;
      // console.log(this.carImage = response.data);

    });
  }

  getUserFindex() {
    this.userService
      .getUserFindexByUserId(this.authService.getUserId())
      .subscribe((response) => {
        this.userFindex = response.data.findex;
      });
  }


}
