import { Component  } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { ControllerComponent} from '../controller/controller.component';
import { NgFor } from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatCardModule,NgFor,MatButtonModule,MatDividerModule,MatListModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  controller = ControllerComponent.getInstance();

  cart = this.controller.cart;


  remove(){
    
  }
}
