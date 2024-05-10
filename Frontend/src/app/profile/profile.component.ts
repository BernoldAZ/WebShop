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

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatCardModule,MatInputModule,MatButtonModule, ReactiveFormsModule , 
    MatIconModule,MatFormFieldModule,RouterOutlet, RouterLink, RouterLinkActive,
    ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private router: Router) { }

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


  changeData(){
    var newAddress = (<HTMLInputElement>document.getElementById("Address")).value;
    if (newAddress == ""){
      alert('Address cannot be null! Try again!');
    }
    else{
      this.controller.updateUser(newAddress);
      alert('User data has been updated');
    }
  }

}
