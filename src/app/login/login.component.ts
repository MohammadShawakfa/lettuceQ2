import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showPassword: boolean = false;
  loginForm: FormGroup;
  durationInSeconds = 3;
  constructor(private fb: FormBuilder,private _snackBar: MatSnackBar, private router: Router) {} // Inject FormBuilder

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required], // Create form controls
      password: ['', Validators.required],
    });
  }
  //Define snackBar for notifications
  openSnackBar(message: string) {
    this._snackBar.open(message,'',
      {duration: this.durationInSeconds * 1000}
    );
  }
  login() {
    //If the user exists and same password login, else show error message
    if(localStorage.getItem(this.loginForm.value.username))
      {
        let user = JSON.parse(localStorage.getItem(this.loginForm.value.username));
        let userPass =user.password;
        if(userPass == this.loginForm.value.password)
          {
            this.router.navigate(['/home']);
            localStorage.setItem('loggedIn','true');
          }
        else
         this.openSnackBar("Wrong Username/Password")
      }
    else
    {
      this.openSnackBar("Wrong Username/Password")
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordField = document.getElementById('password');
    if (passwordField) {
      passwordField.setAttribute('type', this.showPassword ? 'text' : 'password');
    }
  }

  
  checkLocalStorage()
  {
    alert('Check the local storage for it :3')
  }
}
