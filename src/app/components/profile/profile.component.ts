import { ToastrService } from 'ngx-toastr';
import {FormBuilder,FormGroup,FormControl,Validators,} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/userModel';
import { Customer } from 'src/app/models/customer';
import { AuthService } from 'src/app/services/authService/auth.service';
import { UserService } from 'src/app/services/userService/user.service';
import { CustomerService } from 'src/app/services/customerService/customer.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userUpdateForm: FormGroup;
  customerUpdateForm: FormGroup;
  companyAddForm:FormGroup;
  user: UserModel;
  customer: Customer;
  findex:number;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.createUserUpdateForm();
    this.createCustomerUpdateForm();
    this.getUser();
    this.getCustomer();
    this.createCompanyForm();
    this.getUserFindex();
  }

  createUserUpdateForm() {
    this.userUpdateForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  createCustomerUpdateForm() {
    this.customerUpdateForm = this.formBuilder.group({
      companyName: ['', Validators.required],
    });
  }

  createCompanyForm(){
    this.companyAddForm = this.formBuilder.group({
      userId:[this.authService.getUserId()],
      companyName: ['', Validators.required],
    })
  }

  userUpdate() {
    if (this.userUpdateForm.valid) {
      let userModel = Object.assign(
        { id: this.user.id },
        this.userUpdateForm.value
      );
      this.userService.update(userModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          location.reload()
        },
        (responseError) => {
          this.toastrService.error(responseError.error, 'Hata');
        }
      );
    } else {
      this.toastrService.info('Lütfen formu kontrol ediniz', 'Hata');
    }
  }

  getUser() {
    this.userService
      .getById(this.authService.getUserId())
      .subscribe((response) => {
        this.user = response.data;
        this.userUpdateForm.patchValue(response.data);
      });
  }

  getCustomer() {
    this.customerService
      .getCustomerByUserId(this.authService.getUserId())
      .subscribe((response) => {
        this.customer = response.data;
        this.customerUpdateForm.patchValue(response.data);
      });
  }

  customerUpate() {
    if (this.customerUpdateForm.valid) {
      let customerModel = Object.assign({ id: this.customer.id, userId: this.customer.userId }, this.customerUpdateForm.value);
      this.customerService.update(customerModel).subscribe(response=>{
        this.toastrService.success(response.message, "Başarılı");
        location.reload()
      },responseError=>{
        this.toastrService.error(responseError.error, "Hata")
      })
    }else{
      this.toastrService.info("Lütfen formu kontrol ediniz", "Uyarı")
    }
  }

  getUserFindex(){
    this.userService.getUserFindexByUserId(this.authService.getUserId()).subscribe(response=>{
        this.findex = response.data.findex
    })
  }

  companyAdd(){
    if (this.companyAddForm.valid) {
     let companyModel = Object.assign({},this.companyAddForm.value);
     this.customerService.add(companyModel).subscribe(response=>{
       this.toastrService.success(response.message,"Başarılı")
     },responseError=>{
      if (responseError.error.Errors.length > 0) {
        for (let i = 0; i < responseError.error.Errors.length; i++) {
           this.toastrService.error(
            responseError.error.Errors[i].ErrorMessage,
            'Doğrulama Hatası'
          );
        }
      }
     })
    }
  }

}
