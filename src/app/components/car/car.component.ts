import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car/car';
import { ActivatedRoute } from '@angular/router';
import { CarImage } from 'src/app/models/car/carImage';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/car/carDetail';
import { CarService } from 'src/app/services/carService/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
  host: {'class': 'row m-0 p-0'}
})
export class CarComponent implements OnInit {
  baseUrl = 'https://localhost:44357/uploads/carImages/'
  cars: Car[] = [];
  defaultImg = "defaultimage.png"
  images: CarImage[] = [];
  carDetail: CarDetail[] = [];
  dataLoaded = false;
  carfilterText = '';
  constructor(
    private carService: CarService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId'] && params['colorId']) {
        this.getCarsByBrandAndColor(params['brandId'], params['colorId']);
      } else if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else {
        this.getCars();
      }
    });
  }
  getCars() {
    this.carService.getCarsDetail().subscribe((response) => {
      this.carDetail = response.data;
      this.dataLoaded = true
    });
  }

  getCarsByBrand(brandId: number) {
    this.carService.getCarDetailByBrandId(brandId).subscribe((response) => {
      this.carDetail = response.data;
      this.dataLoaded = true;
      if(this.carDetail.length==0){
        this.toastrService.error(
          'Seçtiğiniz markada bir araç bulunmamaktadır.',
          'Arama Sonucu'
        );
      }
    });
  }

  getCarsByColor(colorId: number) {
    this.carService.getCarDetailByColorId(colorId).subscribe((response) => {
      this.carDetail = response.data;
      this.dataLoaded = true;
      if(this.carDetail.length==0){
        this.toastrService.error(
          'Seçtiğiniz renkte bir araç bulunmamaktadır.',
          'Arama Sonucu'
        );
      }
    });
    this.dataLoaded = true;
  }


  getCarsByBrandAndColor(brandId: number, colorId: number) {
    this.carService
      .getCarsByBrandAndColor(brandId, colorId)
      .subscribe((response) => {
        this.carDetail = response.data;
        if (this.carDetail.length == 0) {
          this.toastrService.error(
            'Arama sonuçunuza ait bir araç bulunmamaktadır.',
            'Arama Sonucu'
          );
        }
      });
  }



}
