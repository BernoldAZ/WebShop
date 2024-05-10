export interface Product {
    id: number;
    name: String;
    description : String;
    price: number;
    stock : number;
    photo : String; //Link to photo on internet
  }
  
  export interface User {
    name: String;
    email : String;
    address: String;
  }

  export interface PreviusBills{
    id : number,
    date : Date,
    total : number,
    products : CartProduct[]

  }

  export interface CartProduct{
    id: number,
    name : String,
    quantity : number,
    price : number
  }

  export interface Options{
    value: number, 
    viewValue: String
  }

  export interface Shoppings{
    id : number,
    date: String,
    total : number,
    user_name : String,
    address : String
    items : CartProduct[]
  }