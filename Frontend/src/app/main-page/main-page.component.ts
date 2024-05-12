import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Component,OnInit  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../search.pipe';
import { Router } from '@angular/router';
import { ControllerComponent} from '../controller/controller.component';
import { NgFor } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ItemDialogComponent } from '../item-dialog/item-dialog.component';
import { Product } from '../controller/interfaces';
import { HttpClient, HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [HttpClientModule,MatMenuModule,MatBadgeModule,MatCardModule,MatGridListModule, MatButtonModule, MatDialogModule ,
            NgFor,MatToolbarModule, MatButtonModule, MatIconModule,FormsModule,SearchPipe],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit{

  controller = ControllerComponent.getInstance();

  constructor(private router: Router, public dialog: MatDialog,private http : HttpClient) { 
    this.data = this.controller.products;
  }

  data : Product[];
  searchText = '';
  items_cart = this.controller.items_cart;

  logout(){
    this.controller.logout();
    this.router.navigate(['/']);
  }

  viewProfile(){
    this.router.navigate(['/profile']);
  }

  viewHistory(){
    this.router.navigate(['/history']);
  }

  viewCart(){
    this.router.navigate(['/cart']);
  }

  async ngOnInit(){
    if( ! this.controller.checkLogedIn()){
      this.router.navigate(['/']);
    }
    await this.controller.getProductsBackend(true,this.http);
    this.data = this.controller.products;
  }

  openDialog(product : Product) {
    const dialogRef = this.dialog.open(ItemDialogComponent,{
      data: { product: product },
      height: '500px',
      width: '700px',
    },
  );

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.items_cart = this.controller.items_cart;
      }
    });
  }

}
