import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {
  totalPrice:number;
  cartsItems: any[] = [];


  constructor(private dataService:DataService,private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
      this.processItems();
  }

  processItems() {
    const itemMap = new Map<string, any>();

    this.dataService.cartsItems.forEach(item => {
      if (itemMap.has(item.name)) {
        const existingItem = itemMap.get(item.name);
        existingItem.count++;
        existingItem.totalPrice += item.price;
      } else {
        itemMap.set(item.name, {
          ...item,
          count: 1,
          totalPrice: item.price
        });
      }
    });

    this.cartsItems = Array.from(itemMap.values());
    this.calculateTotalPrice();
  }

  calculateTotalPrice()
  {
    this.totalPrice = this.cartsItems.reduce((acc, item) => acc + item.totalPrice, 0);
  }
  checkout() {
    //check if the user is guest or logged in
    if(localStorage.getItem('loggedIn'))
      {
      // Route back to home
      this.router.navigate(['/home']);
      // Show snackbar message
      this.snackBar.open('Checkout completed!', 'Dismiss', {
        duration: 3000
      });
      //Empty the cart
      this.dataService.cartsItems =[];
      }
      else
      {
        this.snackBar.open('Please sign up to continue checkout', 'Sign Up', {
          duration: 3000
        }).onAction().subscribe(() => {
          this.router.navigate(['/signUp']); // Navigate to signup page on action click
        });
      }
  }
  goBack()
  {
    this.router.navigate(['/home']);
  }
 

}
