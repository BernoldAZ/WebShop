import { Component    } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { ControllerComponent} from '../controller/controller.component';
import { NgFor } from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule } from '@angular/material/list';
import { Product,CartProduct,User } from '../controller/interfaces';
import { Router } from '@angular/router';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [HttpClientModule,MatCardModule,NgFor,MatButtonModule,MatDividerModule,MatListModule,MatDialogModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  constructor(private router: Router, public dialog: MatDialog, private http : HttpClient) { }

  ngOnInit(){
    if( ! this.controller.checkLogedIn()){
      this.router.navigate(['/']);
    }
  }


  controller = ControllerComponent.getInstance();

  cart = this.controller.cart;


  remove(item : CartProduct){
    this.controller.cart = this.controller.cart.filter((ele, ind) => ele !== item);
    this.controller.items_cart--;
    this.cart = this.controller.cart;
  }

  async openDialog() {
    if(this.cart.length == 0){
      alert('Cart is empty');
    }
    else{
      const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
          height: '400px',
          width: '600px',
        },
      );
    
        dialogRef.afterClosed().subscribe(async result => {
          let status = await this.controller.orderConfirmed(this.http);
          if(status){
            alert('Order confirmed');
            this.router.navigate(['/main']);
          }
          else{
            alert('An error has occurred');
          }
        });
    }
  }

}
