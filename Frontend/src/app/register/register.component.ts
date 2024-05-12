import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterOutlet,Router } from '@angular/router';
import {Component} from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ControllerComponent} from '../controller/controller.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatCardModule,MatInputModule,MatButtonModule, ReactiveFormsModule , HttpClientModule,
    MatIconModule,MatFormFieldModule,RouterOutlet, RouterLink, RouterLinkActive,
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private router: Router,private http : HttpClient) { }

  controller = ControllerComponent.getInstance();

  hide = true;
  isDisabled = true;
  btnSubmit = true;

  nameFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passFormControl = new FormControl('', [Validators.required]);
  addressFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  async createUser(){
    var email = (<HTMLInputElement>document.getElementById("Email")).value;
    var pass = (<HTMLInputElement>document.getElementById("Password")).value;
    var name = (<HTMLInputElement>document.getElementById("Name")).value;
    var address = (<HTMLInputElement>document.getElementById("Address")).value;
    console.log('Email:', email);
    console.log('Password:', pass);

    if (await this.controller.registerUser(name,email,pass,address,this.http)){
      alert('User created succesfully');
      this.router.navigate(['/']);
    }
    else{
      alert('User with this email already exists');
    }

  }
}
