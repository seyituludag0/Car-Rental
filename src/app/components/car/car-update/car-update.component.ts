import { CarDetail } from './../../../models/car/carDetail';
import { CarImageService } from 'src/app/services/carImageService/car-image.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { CarService } from 'src/app/services/carService/car.service';
import { BrandService } from 'src/app/services/brandService/brand.service';
import { ColorService } from 'src/app/services/colorService/color.service';
import { Car } from 'src/app/models/car/car';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm:FormGroup
  imageUpdateForm:FormGroup
  car:Car
  colors: Color[];
  brands: Brand[];

  savedCarId:number;
  imageFile: File;
  imageFiles:File[]
  currentCarImageId:number;
  id:number



  constructor(
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router,
    private carImageService: CarImageService
  ) {}

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getCarById(params['id']);
      }

    });
  }

  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      id: [this.car.id, Validators.required],
      brandId:[ this.car.brandId, Validators.required],
      colorId:[ this.car.colorId, Validators.required],
      colorName: [ this.car.colorName,Validators.required],
      modelName: [ this.car.modelName,Validators.required],
      minFindex: [ this.car.minFindex ,Validators.required],
      modelYear: [this.car.modelYear,Validators.required],
      dailyPrice: [this.car.dailyPrice,Validators.required],
      description: [this.car.description,Validators.required],
    });
  }

  getCarById(carId: number) {
    this.carService.getCarDetails(carId).subscribe((response) => {
      this.car = response.data;
      this.createCarUpdateForm();
    });
  }

  update() {
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value);
      this.carService.update(carModel).subscribe((response) => {
        this.toastrService.success(response.message, 'Başarılı');
        this.router.navigate(["/operations"])
      },responseError=>{
        this.toastrService.error(responseError.error)
      });
    }else{
      this.toastrService.error("Hataaa")
    }
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data
    })
  }

  createCarImageUpdateForm() {
    this.imageUpdateForm = this.formBuilder.group({
      carId: [this.savedCarId],
      file: ['', Validators.required],
    });
  }

  uploadFile(event: any) {
    this.imageFiles = event.target.files;
  }

  updateImage() {
    if (this.imageUpdateForm.valid) {
      for (let i = 0; i < this.imageFiles.length; i++) {
        this.carImageService.update(this.id,this.imageFile,this.currentCarImageId).subscribe((response) => {});
      }
    }
  }

}
