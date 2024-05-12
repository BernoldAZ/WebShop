import { Component  } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ControllerComponent} from '../controller/controller.component';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule,MatInputModule,MatButtonModule, HttpClientModule,
            MatIconModule,MatFormFieldModule,RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  hide = true;
  controller = ControllerComponent.getInstance();

  constructor(private router: Router, private http : HttpClient) { }

  ngOnInit(): void {
  }

  changeHide(){
    this.hide = !this.hide;
  }

  async login(){
    var email = (<HTMLInputElement>document.getElementById("Email")).value;
    var pass = (<HTMLInputElement>document.getElementById("Password")).value;
    console.log('Email:', email);
    console.log('Password:', pass);
    const validation =  await this.controller.loginUser(email,pass,this.http);
    console.log(this.controller.user);
    if (validation){
      if(this.controller.user.type == 0){ //is admin
        this.router.navigate(['/main-admin']);
      }
      else{
        this.router.navigate(['/main']);
      }
    }
    else{
      alert('Invalid credentials');
    }
  }
}
