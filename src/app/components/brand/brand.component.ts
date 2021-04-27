import { ActivatedRoute } from '@angular/router';
import { BrandImage } from './../../models/brandImage';
import { Component, OnInit, Output } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brandService/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  baseUrl = 'https://localhost:44357/uploads/';
  defaultImg = 'logo.svg';
  brands: Brand[] = [];
  brandImages: BrandImage;
  currentBrand: Brand = { id: -1, name: '', imagePath: '' };
  dataLoaded = false;
  filterText: string;
  constructor(
    private brandService: BrandService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      console.log(response.data);

      this.dataLoaded = true;
    });
  }
  setCurrentBrand(brand: Brand) {
    this.currentBrand = brand;
  }
  removeCurrentBrand() {
    this.filterText = '';
    this.currentBrand = { id: -1, name: '', imagePath: '' };
  }
  getCurrentBrandClass(brand: Brand) {
    if (brand == this.currentBrand) {
      return 'list-group-item cursorPointer active';
    } else {
      return 'list-group-item cursorPointer';
    }
  }
  getAllBrandClass() {
    let defaultBrand: Brand = { id: -1, name: '', imagePath: '' };
    if (this.currentBrand.id == defaultBrand.id) {
      return 'list-group-item active cursorPointer';
    } else {
      return 'list-group-item cursorPointer';
    }
  }


}
