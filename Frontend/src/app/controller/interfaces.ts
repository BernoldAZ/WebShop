export interface Product {
    id: number;
    name: string;
    description : string;
    price: number;
    stock : number;
    photo : string; //Link to photo on internet
  }
  
  export interface User {
    name: string;
    email : string;
    address: string;
    type : number;
  }

  export interface PreviusBills{
    id : number,
    date : Date,
    total : number,
    products : CartProduct[]

  }

  export interface CartProduct{
    id: number,
    name : string,
    quantity : number,
    price : number
  }

  export interface Options{
    value: number, 
    viewValue: string
  }

  export interface Shoppings{
    id : number,
    date: string,
    total : number,
    user_name : string,
    address : string
    items : CartProduct[]
  }