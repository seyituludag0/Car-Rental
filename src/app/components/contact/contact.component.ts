import { Router } from '@angular/router';
import { ContactService } from '../../services/contactService/contact.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  formData: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private router:Router,
  ) {}

  ngOnInit(): void {
    this.createContactForm();
  }

  createContactForm() {
    this.formData = this.formBuilder.group({
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', [Validators.required]),
    });
  }


  onSubmit(formData: any) {
    console.log(formData);
    this.contactService.postMessage(formData).subscribe((response) => {
      this.router.navigate(['/successsendemail'])
      console.log(response);
    },responseError=>{
      console.warn(responseError.responseText);
      console.log({responseError});
    });
  }
}
