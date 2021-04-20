import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car/car';
import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/carService/car.service';
import { ColorService } from 'src/app/services/colorService/color.service';
import { BrandService } from 'src/app/services/brandService/brand.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {

  cars:Car[]
  brands:Brand[]
  colors:Color[]

  deleteCar = {
    id:0,
    progress:0
  }

  deleteBrand = {
    id:0,
    progress:0
  }

  deleteColor = {
    id:0,
    progress:0
  }

  constructor(
    private carService:CarService,
    private brandService:BrandService,
    private colorService:ColorService,
    private toastrService:ToastrService,
    private router:Router,
  ) { }

  ngOnInit(): void {
  this.getCars();
  this.getBrands();
  this.getColors();
  }

  getCars(){
    this.carService.getCarsDetail().subscribe(response=>{
      this.cars = response.data;
      // console.log(response.data);
    })
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
      // console.log(response.data);
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data;
      // console.log(response.data);
    })
  }

  carDelete(car: Car) {
    this.carService.delete(car).subscribe((response) => {
      this.toastrService.success(response.message, 'Başarılı');
      location.reload();
    });
  }

  brandDelete(brand:Brand) {
    this.brandService.delete(brand).subscribe((response) => {
      this.toastrService.success(response.message, 'Başarılı');
      location.reload();
    });
  }

  colorDelete(color:Color) {
    this.colorService.delete(color).subscribe((response) => {
      this.toastrService.success(response.message, 'Başarılı');
      location.reload();
    });
  }

  holdHandlerCar(e: number, car: Car) {
    this.deleteCar.id = car.id;
    this.deleteCar.progress = e / 10;

    if (e / 10 > 100) {
      this.carDelete(car);
    }
  }

  holdHandlerBrand(e: number, brand: Brand) {
    this.deleteBrand.id = brand.id;
    this.deleteBrand.progress = e / 10;

    if (e / 10 > 100) {
      this.brandDelete(brand);
    }
  }

  holdHandlerColor(e: number, color: Color) {
    this.deleteColor.id = color.id;
    this.deleteColor.progress = e / 10;

    if (e / 10 > 100) {
      this.colorDelete(color);
    }
  }

}
