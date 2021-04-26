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

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css'],
})
export class ColorUpdateComponent implements OnInit {
  color: Color;
  name: Color;
  id: Color;
  colorUpdateForm: FormGroup;

  constructor(
    private colorService: ColorService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.createColorUpdateForm();
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getColorById(params['id']);
      }
    });
  }

  createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      id: [this.colorUpdateForm ? this.color.id : '', Validators.required],
      name: [this.colorUpdateForm ? this.color.name : '',Validators.required],
    });
  }

  getColorById(colorId: number) {
    this.colorService.getColor(colorId).subscribe((response) => {
      this.color = response.data;
      this.createColorUpdateForm();
    });
  }

  update() {
    if (this.colorUpdateForm.valid) {
      let colorModel = Object.assign({}, this.colorUpdateForm.value);
      this.colorService.update(colorModel).subscribe((response) => {
        this.toastrService.success(response.message, 'Başarılı');
        this.router.navigate(["/operations"])
      });
    }
  }
}
