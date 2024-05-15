import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule } from '@angular/material/list';
import { ControllerComponent} from '../controller/controller.component';
import { Product,CartProduct,User,Shoppings } from '../controller/interfaces';
import { NgFor } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-history',
  standalone: true,
  imports: [HttpClientModule,MatCardModule,MatDividerModule,MatListModule,NgFor,MatExpansionModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {

  controller = ControllerComponent.getInstance();
  history : Shoppings[] = [];
  panelOpenState = false;

  constructor(private router: Router,private http : HttpClient) {}

  async ngOnInit(){
    if( ! this.controller.checkLogedIn()){
      this.router.navigate(['/']);
    }
    this.history = await this.controller.getHistory(this.http);
    console.log(this.history);
  }

}
