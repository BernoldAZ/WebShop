import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterOutlet,Router } from '@angular/router';
import {Component} from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ControllerComponent} from '../controller/controller.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HttpClientModule,MatCardModule,MatInputModule,MatButtonModule, ReactiveFormsModule , 
    MatIconModule,MatFormFieldModule,RouterOutlet, RouterLink, RouterLinkActive,
    ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private router: Router,private http : HttpClient) { }

  name : String = "";
  email : String = "";
  address : String = "";

  

  ngOnInit(){
    if( ! this.controller.checkLogedIn()){
      this.router.navigate(['/']);
    }
    this.getUserData();
    
  }

  getUserData(){
    this.name = this.controller.user.name;
    this.email = this.controller.user.email;
    this.address = this.controller.user.address;
  }

  controller = ControllerComponent.getInstance();


  async changeData(){
    var newAddress = (<HTMLInputElement>document.getElementById("Address")).value;
    if (newAddress == ""){
      alert('Address cannot be null! Try again!');
    }
    else{
      var status : boolean = await this.controller.updateUser(newAddress,this.http);
      if (status){
        this.address = this.controller.user.address;
        alert('User data has been updated');
      }
      else{
        alert('An error occured while adding the product');
      }
    }
  }

}
