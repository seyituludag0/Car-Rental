import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { CarService } from 'src/app/services/carService/car.service';
import { CarImageService } from 'src/app/services/carImageService/car-image.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  carAddForm: FormGroup;
  imageAddForm: FormGroup;
  imageFiles: File[];
  savedCarId: number;
  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private toastrService: ToastrService,
    private carImageService: CarImageService,
    private router:Router,
  ) {}

  ngOnInit(): void {
    this.createCarAddForm();
    this.createCarImageAddForm();
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelName: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
      minFindex: ['', Validators.required],
    });
  }

  add() {
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value);
      this.carService.add(carModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.savedCarId = response.data.id;
          this.addImage();
          this.toastrService.success("Resim(ler) ekledi.", "Başarılı")
          this.router.navigate(["/operations"])
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Doğrulama Hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.info('Formunuzu Kontrol Ediniz...', 'DİKKAT');
    }
  }

  createCarImageAddForm() {
    this.imageAddForm = this.formBuilder.group({
      carId: [this.savedCarId],
      file: ['', Validators.required],
    });
  }

  uploadFile(event: any) {
    this.imageFiles = event.target.files;
  }

  addImage() {
    if (this.imageAddForm.valid) {
      for (let i = 0; i < this.imageFiles.length; i++) {
        this.carImageService
          .add(this.savedCarId, this.imageFiles[i])
          .subscribe((response) => {});
      }
    }
  }
}
