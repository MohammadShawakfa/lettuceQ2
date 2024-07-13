import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: any[] = [];
  itemsToShow: any[] = [];
  itemsView:boolean=false;

  categories=
  [
    // {id:1,name:'Meat and seafood',image:"assets/categories/meatSeafood.jfif"},
    {id:1,name:'Meat and seafood',image:"assets/categories/meat.svg"},
    {id:2,name:'Dairy and eggs',image:"assets/categories/dairy.svg"},
    {id:3,name:'Snacks',image:"assets/categories/snacks.svg"},
    {id:4,name:'Coffee and tea',image:"assets/categories/coffee.svg"},
    {id:5,name:'Bakery',image:"assets/categories/bakery.svg"},
    {id:6,name:'Fruits and Vegtebales',image:"assets/categories/fruits.svg"},
  ]
  constructor(private dataService: DataService,private _snackBar: MatSnackBar, private router: Router) { }
  durationInSeconds = 3;
  isLoggedIn:boolean;


  ngOnInit(): void {
      if(localStorage.getItem('loggedIn'))
      {
        this.isLoggedIn = true;
      }else
      {
        this.isLoggedIn = false;
      }
    
    this.dataService.getItems().subscribe(
      {
        next:(data)=>
          {
            console.log(data);
            this.items = data;
          }
      })
  }

  //Define snackBar for notifications
  openSnackBar(message: string) {
    this._snackBar.open(message,'',
      {duration: this.durationInSeconds * 1000}
    );
  }

  goToCategory(id:number)
  {
    this.itemsView = true;
    this.itemsToShow = this.items.filter(item=>
      {
        return item.categorieID == id;
      })
      console.log(this.itemsToShow)
  }

  addToCart(item)
  {
    this.dataService.cartsItems.push(item);
    this.openSnackBar("Item added to cart");
  }

  goToCart()
  {
    this.router.navigate(['/myCart']);
  }

  logout() {
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/login']);
  }

  signUp()
  {
    this.router.navigate(['/signUp']);
  }
  

}
