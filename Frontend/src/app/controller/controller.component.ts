import { Component } from '@angular/core';
import { Product,CartProduct,User, Shoppings} from './interfaces';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { Observable,lastValueFrom  } from 'rxjs';

@Component({
  selector: 'app-controller',
  standalone: true,
  imports: [HttpClientModule,],
  templateUrl: './controller.component.html',
  styleUrl: './controller.component.css'
})
export class ControllerComponent {
  private static instance: ControllerComponent;
  private constructor() { }
  public static getInstance(): ControllerComponent {
    if (!ControllerComponent.instance) {
      ControllerComponent.instance = new ControllerComponent();
    }

    return ControllerComponent.instance;
  }

  user : User = {
    name : "",
    email : "",
    address: "",
    type : -1 // type 1: normal user, type 0: admin, -1: null
  }

  cart : CartProduct[] = [];
  products : Product[] = [];
  items_cart : number = 0;
  orderDate = '';
  total = 0;




  logout(){
    this.user = {
      name : "",
      email : "",
      address: "",
      type : -1
    }
    return true;
  }

  checkLogedIn(){
    if (this.user.email == ""){
      return false;
    }
    else{
      return true;
    }
  }

  async orderConfirmed(http : HttpClient){
    //submit to backend
    const url = 'http://localhost:8080/addhistory';
    const requestBody = new URLSearchParams();
    requestBody.append('date', this.orderDate);
    requestBody.append('total', this.total.toString());
    requestBody.append('user_name', this.user.name);
    requestBody.append('email', this.user.email);
    requestBody.append('address', this.user.address);
    requestBody.append('items', JSON.stringify(this.cart));

    try {
      var promise = http.post<User>(url, requestBody.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      await lastValueFrom(promise);
      this.cart = []
      this.items_cart = 0;
      return true;
      
    } catch (error) {
      return false
    }
  }

  async getHistory(http : HttpClient){
    //get history from backend for the user
    const url = 'http://localhost:8080/history';
    const requestBody = new URLSearchParams();
    requestBody.append('user', this.user.email);
    return await lastValueFrom (http.post<Shoppings[]>(url, requestBody.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }))
  }

  async addProduct(product : Product,http : HttpClient){
    //add it in the back end
    const url = 'http://localhost:8080/addProduct';
    const requestBody = new URLSearchParams();
    requestBody.append('name', product.name);
    requestBody.append('description', product.description);
    requestBody.append('price', product.price.toString());
    requestBody.append('stock', product.stock.toString());
    requestBody.append('photo', product.photo);

    try {
      var promise = http.post<User>(url, requestBody.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      await lastValueFrom(promise);
      return true;
      
    } catch (error) {
      return false
    }
  }

  async removeProduct(productID : number,http : HttpClient){
    //remove it in the back end
    const url = 'http://localhost:8080/removeProduct';
    const requestBody = new URLSearchParams();
    requestBody.append('id', productID.toString());
    try {
      var promise = http.post<User>(url, requestBody.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      await lastValueFrom(promise);
      return true;
      
    } catch (error) {
      return false
    }
  }

  async updateProduct(product : Product,http : HttpClient){
    //add it in the back end
    const url = 'http://localhost:8080/editProduct';
    const requestBody = new URLSearchParams();
    requestBody.append('id', product.id.toString());
    requestBody.append('name', product.name);
    requestBody.append('description', product.description);
    requestBody.append('price', product.price.toString());
    requestBody.append('stock', product.stock.toString());
    requestBody.append('photo', product.photo);

    try {
      var promise = http.post<User>(url, requestBody.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      await lastValueFrom(promise);
      return true;
      
    } catch (error) {
      return false
    }
  }

  async getProductsBackend(refresh : boolean,http : HttpClient){
    if (this.products.length == 0 || refresh){
      const url = 'http://localhost:8080/products';
      this.products = await lastValueFrom (http.get<Product[]>(url));
    }
  }


  async loginUser(user: string, password: string,http : HttpClient) {
    const url = 'http://localhost:8080/login';
    const requestBody = new URLSearchParams();
    requestBody.append('user', user);
    requestBody.append('password', password);

    try {
      var promise = http.post<User>(url, requestBody.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      this.user = await lastValueFrom(promise);
      return true;
      
    } catch (error) {
      return false
    }
  }

  async registerUser(name : string, email : string,pass : string, address:string,http : HttpClient) {
    const url = 'http://localhost:8080/register';
    const requestBody = new URLSearchParams();
    requestBody.append('user', email);
    requestBody.append('password', pass);
    requestBody.append('name', name);
    requestBody.append('address', address);

    try {
      var promise = http.post<User>(url, requestBody.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      await lastValueFrom(promise);
      return true;
      
    } catch (error) {
      return false
    }
  }

  async updateUser(newAddress:string,http : HttpClient) {
    const url = 'http://localhost:8080/update-user';
    const requestBody = new URLSearchParams();
    requestBody.append('user', this.user.email);
    requestBody.append('address', newAddress);

    try {
      var promise = http.post<User>(url, requestBody.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      await lastValueFrom(promise);
      this.user.address = newAddress
      return true;
      
    } catch (error) {
      return false
    }
  }

}