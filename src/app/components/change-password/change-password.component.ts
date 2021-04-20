import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authService/auth.service';
import { LocalStorageService } from 'src/app/services/localStrogeService/local-storage.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  currentUserId: number;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private localStorageService:LocalStorageService,
    private router:Router,
  ) {}

  ngOnInit(): void {
    this.createChangePasswordForm();
    this.currentUserId = this.authService.getUserId();
  }

  createChangePasswordForm() {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
    });
  }

  changePassword() {
    if (this.changePasswordForm.valid) {
      // console.log(this.changePasswordForm.value);
      let passwordModel = Object.assign(
        { userId: this.currentUserId },
        this.changePasswordForm.value
      );
      this.authService.changePassword(passwordModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.localStorageService.delete("token")
          this.router.navigate(["/login"])
        },
        (responseError) => {
          this.toastrService.error(responseError.error, 'Hata');
        }
      );
    }
    else {
      this.toastrService.info('Lütfen formu kontrol ediniz', 'Uyarı');
    }
  }
}
