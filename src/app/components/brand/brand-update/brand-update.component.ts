import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/colorService/color.service';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brandService/brand.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css'],
})
export class BrandUpdateComponent implements OnInit {
  brand: Brand;
  name: Brand;
  id: Brand;
  brandUpdateForm: FormGroup;

  constructor(
    private brandService: BrandService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.createBrandUpdateForm();
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getBrandById(params['id']);
      }
    });
  }

  createBrandUpdateForm() {
    this.brandUpdateForm = this.formBuilder.group({
      id: [this.brandUpdateForm ? this.brand.id : '', Validators.required],
      name: [this.brandUpdateForm ? this.brand.name : '',Validators.required,
      ],
    });
  }

  getBrandById(brandId: number) {
    this.brandService.getBrand(brandId).subscribe((response) => {
      this.brand = response.data;
      this.createBrandUpdateForm();
    });
  }

  update() {
    if (this.brandUpdateForm.valid) {
      let brandModel = Object.assign({}, this.brandUpdateForm.value);
      this.brandService.update(brandModel).subscribe((response) => {
        this.toastrService.success(response.message, 'Başarılı');
        this.router.navigate(["/operations"])
      });
    }
  }
}
