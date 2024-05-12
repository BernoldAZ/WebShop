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
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [MatInputModule,HttpClientModule,MatDividerModule,MatFormFieldModule,MatExpansionModule,MatCardModule,MatListModule,NgFor,MatToolbarModule,MatIconModule,MatMenuModule,MatButtonModule],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {

  controller = ControllerComponent.getInstance();
  items : Product[] = [];
  panelOpenState = false;

  async ngOnInit(){
    if( ! this.controller.checkLogedIn()){
      this.router.navigate(['/']);
    }
    await this.controller.getProductsBackend(true,this.http)
    this.items = this.controller.products;
    console.log(this.items)
  }

  constructor(private router: Router, public dialog: MatDialog,private http : HttpClient) { 
    
  }

  async addProduct(){
    var Name = (<HTMLInputElement>document.getElementById( "newName")).value;
    var Description = (<HTMLInputElement>document.getElementById( "newDescription")).value;
    var Price = (<HTMLInputElement>document.getElementById( "newPrice")).value;
    var Stock = (<HTMLInputElement>document.getElementById( "newStock")).value;
    var Photo = (<HTMLInputElement>document.getElementById( "newPhoto")).value;

    var editedProduct : Product = {
      id : 0,
      name : Name,
      description : Description,
      price : Number(Price),
      stock : Number(Stock),
      photo : Photo
    }
    var status : boolean = await this.controller.addProduct(editedProduct,this.http);
    if (status){
      alert('Product added successfully');
      await this.controller.getProductsBackend(true,this.http)
      this.items = this.controller.products;
    }
    else{
      alert('An error occured while adding the product');
    }

  }

  async removeProduct(product : Product){
    var status : boolean = await this.controller.removeProduct(product.id,this.http);
    if (status){
      await this.controller.getProductsBackend(true,this.http)
      this.items = this.controller.products;
      alert('Product removed successfully');
    }
    else{
      alert('An error occured while removing the product');
    }
  }

  async editProduct(id:number){
    var Name = (<HTMLInputElement>document.getElementById(id.toString() + "Name")).value;
    var Description = (<HTMLInputElement>document.getElementById(id.toString() + "Description")).value;
    var Price = (<HTMLInputElement>document.getElementById(id.toString() + "Price")).value;
    var Stock = (<HTMLInputElement>document.getElementById(id.toString() + "Stock")).value;
    var Photo = (<HTMLInputElement>document.getElementById(id.toString() + "Photo")).value;

    var editedProduct : Product = {
      id : id,
      name : Name,
      description : Description,
      price : Number(Price),
      stock : Number(Stock),
      photo : Photo
    }
    var status : boolean = await this.controller.updateProduct(editedProduct,this.http);
    if (status){
      await this.controller.getProductsBackend(true,this.http)
      this.items = this.controller.products;
      alert('Product updated successfully');
    }
    else{
      alert('An error occured while updating the product');
    }
  }

  logout(){
    this.controller.logout();
    this.router.navigate(['/']);
  }

}
