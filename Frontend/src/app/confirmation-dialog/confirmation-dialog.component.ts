import { Component } from '@angular/core';
import { ControllerComponent} from '../controller/controller.component';
import {MatListModule } from '@angular/material/list';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { NgFor } from '@angular/common';
import { Product,CartProduct,User,Options } from '../controller/interfaces';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [MatButtonModule,HttpClientModule,MatListModule,MatDialogModule,NgFor],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css'
})
export class ConfirmationDialogComponent {

  constructor(private http : HttpClient) { 
    this.total = 0;
    for( let i = 0;i<this.cart.length;i++){
      this.total += this.cart[i].price;
    }
  }

  controller = ControllerComponent.getInstance();

  user = this.controller.user;
  cart : CartProduct[]= this.controller.cart;
  date = new Date();
  total : number;

  confirm(){
    console.log(this.cart);
    
    this.controller.orderConfirmed(this.date.toLocaleString(),this.total,this.http);
  }

}
