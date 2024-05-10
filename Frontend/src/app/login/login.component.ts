import { Component  } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ControllerComponent} from '../controller/controller.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule,MatInputModule,MatButtonModule, 
            MatIconModule,MatFormFieldModule,RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  hide = true;
  controller = ControllerComponent.getInstance();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    
    var email = (<HTMLInputElement>document.getElementById("Email")).value;
    var pass = (<HTMLInputElement>document.getElementById("Password")).value;
    console.log('Email:', email);
    console.log('Password:', pass);
    if (this.controller.validateLogin(email,pass)){
        this.router.navigate(['/main']);
    }
    else{
      alert('Invalid credentials');
    }
  }

  changeHide(){
    this.hide = !this.hide;
  }
}
