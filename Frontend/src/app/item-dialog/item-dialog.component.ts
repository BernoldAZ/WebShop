import { Component,Inject } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ControllerComponent} from '../controller/controller.component';
import { Product,CartProduct,User,Options } from '../controller/interfaces';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-item-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule,MatGridListModule,MatSelectModule,FormsModule],
  templateUrl: './item-dialog.component.html',
  styleUrl: './item-dialog.component.css'
})
export class ItemDialogComponent {

  controller = ControllerComponent.getInstance();

  declare product : Product;
  options : Options[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: {product: Product}){
    this.product = data.product;

    let options = Math.min(data.product.stock,5);
    for (let i = 1; i <= options; i++){
      this.options.push({value: i, viewValue: i.toString()})
    }
  }

  selectedValue: number = 1;

  buy(){
    for(let i=0; i< this.controller.cart.length;i++){
      if (this.controller.cart[i].id == this.product.id){
        alert('Item already in the cart');
        return;
      }
    }
    this.controller.cart.push({
      id: this.product.id,
      name : this.product.name,
      quantity : this.selectedValue,
      price : this.selectedValue * this.product.price
    })
    this.controller.items_cart++;
  }


}
