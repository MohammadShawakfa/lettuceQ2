import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';






@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  showPassword: boolean = false;
  signUpForm: FormGroup;
  //To track signed up users
  numberOfUsers:number;
  //To set up the time for the snackBar
  durationInSeconds = 3;
  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router) {} //Inject into constructor

  //Define snackBar for notifications
  openSnackBar(message: string) {
    this._snackBar.open(message,'',
      {duration: this.durationInSeconds * 1000}
    );
  }
  

  ngOnInit(): void {
    this.numberOfUsers = localStorage.length;
    this.signUpForm = this.fb.group({
      name:['',Validators.required],
      email: ['', Validators.required], // Create form controls
      password: ['', Validators.required],
    });

  }


  signUp() {
    //Sign up of the form is valid
    if(this.signUpForm.valid)
      {
        //Check if the email already exists in the local storage
        //if not, save the user
        let user = 
        {
          name:this.signUpForm.value.name,
          email:this.signUpForm.value.email,
          password:this.signUpForm.value.password
        }
        //Here we check if the email already exists
        if(localStorage.getItem(user.email))
          {
            this.openSnackBar("User Already exists");
          }
          else
          {
            localStorage.setItem(user.email,JSON.stringify(user));
            this.openSnackBar("Signed up! Welcome to Lettuce!");
            localStorage.setItem('loggedIn','true');
            //Route to home for shopping
            this.router.navigate(['/home']);
          }
      }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordField = document.getElementById('password');
    if (passwordField) {
      passwordField.setAttribute('type', this.showPassword ? 'text' : 'password');
    }
  }

  

  guestCheckout() {
    //option for the user to browse without login
    console.log('Guest checkout clicked');
  }
}
