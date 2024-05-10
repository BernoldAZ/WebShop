import { Component } from '@angular/core';
import { Product,CartProduct,User, Shoppings} from './interfaces';

@Component({
  selector: 'app-controller',
  standalone: true,
  imports: [],
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
    address: ""
  }

  cart : CartProduct[] = [];
  items_cart : number = 0;

  validateLogin( email : String,pass : String){
    //get user details
    this.user = {
      name : "Test",
      email : email,
      address: "Test address"
    }
    return true;
  }

  updateUser(newAddress:String){
    //Updates database
    this.user.address = newAddress;
  }

  registerUser(name : String, email : String,pass : String, address:String){

    return true;
  }

  getProducts(){
    return PRODUCT_DATA;
  }

  logout(){
    this.user = {
      name : "",
      email : "",
      address: ""
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

  orderConfirmed(){
    //submit to backend
    this.cart = []
    this.items_cart = 0;
  }

  getHistory() : Shoppings[]{
    //get history from backend for the user
    return PREVIUS_BIILS;
  }

}



const PRODUCT_DATA: Product[] = [
  {id: 1, name: 'Nintendo Switch', price: 300, stock: 3,description : "Nintendo Switch new no games to play", photo : "https://www.proshop.at/Images/915x900/2791820_8522d794875c.jpg"},
  {id: 2, name: 'Nintendo DS', price: 300, stock: 0,description : "", photo : "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Nintendo-3DS-AquaOpen.png/1200px-Nintendo-3DS-AquaOpen.png"},
  {id: 3, name: 'Computer', price: 300, stock: 10,description : "", photo : "https://oechsle.vteximg.com.br/arquivos/ids/16322673-1500-1500/image-3dd13d30a3b84710b769c3de1772266c.jpg?v=638313100342730000"},
  {id: 4, name: 'Playstation 5', price: 300, stock: 10,description : "", photo : "https://cdn.grupoelcorteingles.es/SGFM/dctm/MEDIA03/202311/16/00194481001017____4__1200x1200.jpg"},
  {id: 5, name: 'Xbox one', price: 300, stock: 10,description : "", photo : "https://m.media-amazon.com/images/I/71RmaDXNRTL.jpg"},
  {id: 6, name: 'FIFA24', price: 300, stock: 10,description : "", photo : "https://www.pointekonline.com/wp-content/uploads/2022/09/fifa-24.jpg"},
  {id: 7, name: 'Mario Kart', price: 300, stock: 10,description : "", photo : "https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_85080232?x=536&y=402&format=jpg&quality=80&sp=yes&strip=yes&trim&ex=536&ey=402&align=center&resizesource&unsharp=1.5x1+0.7+0.02&cox=0&coy=0&cdx=536&cdy=402"},
  {id: 8, name: 'Gamer Chair', price: 300, stock: 10,description : "", photo : "https://es.thermaltake.com/media/catalog/product/cache/023a745bb14092c479b288481f91a1bd/x/f/xfit_black-white01.jpg"},
];

const PREVIUS_BIILS : Shoppings[] = [
  {id : 1,  date : "5/11/2024", total : 1500, user_name : 'Test', address : 'Test Address', 
  items : [
    {
        "id": 1,
        "name": "Nintendo Switch",
        "quantity": 1,
        "price": 300
    },
    {
        "id": 3,
        "name": "Computer",
        "quantity": 1,
        "price": 300
    },
    {
        "id": 7,
        "name": "Mario Kart",
        "quantity": 1,
        "price": 300
    },
    {
        "id": 6,
        "name": "FIFA24",
        "quantity": 1,
        "price": 300
    },
    {
        "id": 5,
        "name": "Xbox one",
        "quantity": 1,
        "price": 300
    }
]},
{id : 2,  date : "5/11/2024", total : 3500, user_name : 'Test', address : 'Test Address', 
  items : [
    {
        "id": 1,
        "name": "Nintendo Switch",
        "quantity": 1,
        "price": 300
    },
    {
        "id": 3,
        "name": "Computer",
        "quantity": 1,
        "price": 300
    },
    {
        "id": 7,
        "name": "Mario Kart",
        "quantity": 1,
        "price": 300
    },
    {
        "id": 6,
        "name": "FIFA24",
        "quantity": 1,
        "price": 300
    },
    {
        "id": 5,
        "name": "Xbox one",
        "quantity": 1,
        "price": 300
    }
]},
];