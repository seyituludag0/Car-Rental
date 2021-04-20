import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rental';
import { CardModel } from 'src/app/models/cardModel';
import { Payment } from 'src/app/models/payment';
import { RentalService } from 'src/app/services/rentalService/rental.service';
import { PaymentService } from 'src/app/services/paymentService/payment.service';
import { AuthService } from 'src/app/services/authService/auth.service';
import { CardDetailService } from 'src/app/services/cardDetailService/card-detail.service';
import { UserService } from 'src/app/services/userService/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  rentalAddForm: FormGroup;
  rental: Rental;
  isChecked = false;
  cards: CardModel[]=[];
  id: number;
  cardNumber: number;
  cVV: number;
  expirationDate: string;
  firstName: string;
  lastName: string;
  currentCard: Payment;
  paymentModel:Payment

  constructor(
    private rentalService: RentalService,
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private cardDetailService: CardDetailService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['rental']) {
        this.rental = JSON.parse(params['rental']);
        this.createRentalAddForm();
        this.getCardsByUserId();
      }
    });
  }

  createRentalAddForm() {
    this.rentalAddForm = this.formBuilder.group({
      cardNumber: ['', Validators.required],
      expirationDate: ['', Validators.required],
      cVV: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  CardSave() {
    if (this.isChecked == true) {
      let cardModel = Object.assign(
        { userId: this.authService.getUserId() },
        this.rentalAddForm.value
      );
      this.cardDetailService.saveCard(cardModel).subscribe((response) => {
        this.toastrService.success(response.message, 'Başarılı');
      });
    }
  }

  addRental() {
    if (this.rentalAddForm.valid || this.currentCard) {
      let addRentalModel = Object.assign({}, this.rentalAddForm.value);
      this.rentalService.addRental(this.rental).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.CardSave();
        },
        (responseError) => {
          this.toastrService.error(responseError.error, 'Hata');
        }
      );
    } else {
      this.toastrService.error('Formu eksiksiz doldurunuz.', 'Başarılı');
    }
  }

  checkPayment() {
    if (this.currentCard) {
      this.paymentModel = Object.assign({},this.currentCard)
    }else{
      this.paymentModel = Object.assign({},this.rentalAddForm.value)
    }
    // console.log(this.paymentModel);

    this.paymentService.checkPayment(this.paymentModel).subscribe(
      (response) => {
        this.toastrService.success(response.message, 'Başarılı');
        this.addRental();
        this.updateUserFindex();
        this.router.navigate(["/"])
      },
      (responseError) => {
        this.toastrService.error(responseError.message, 'Hata');

      }
    );
  }

  updateUserFindex() {
    console.log(this.authService.getUserId());

    this.userService.updateUserFindex(this.authService.getUserId()).subscribe(
      (response) => {
        console.log(response);

        this.toastrService.info(response.message, 'Bilgi');
        // this.router.navigate(['cars/']);
      },
      (responseError) => {
        console.log(responseError.error);
      }
    );
  }

  getCardsByUserId() {
    this.cardDetailService
      .getCardsByUserId(this.authService.getUserId())
      .subscribe((response) => {
        this.cards = response.data;
      });
  }

  setCurrentCard(card: CardModel) {
    this.currentCard = card
  }
}
