import { ToastrService } from 'ngx-toastr';
import { CardModel } from './../../models/cardModel';
import { Component, OnInit } from '@angular/core';
import { CardDetailService } from 'src/app/services/cardDetailService/card-detail.service';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-my-cards',
  templateUrl: './my-cards.component.html',
  styleUrls: ['./my-cards.component.css'],
})
export class MyCardsComponent implements OnInit {
  cards: CardModel[]=[];
  constructor(
    private cardDetailService: CardDetailService,
    private authService: AuthService,
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    this.getCardsByUserId();
  }

  getCardsByUserId() {
    this.cardDetailService.getCardsByUserId(this.authService.getUserId()).subscribe(response=>{
      this.cards = response.data
    })
  }

  deleteCard(card:CardModel){
    this.cardDetailService.deleteCard(card).subscribe(response => {
      this.toastrService.success(response.message,"Başarılı")
      setTimeout(function () {
        location.reload();
      });
    })
  }

}
