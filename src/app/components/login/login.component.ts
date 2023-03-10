import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent {

  hide = true;

  loginForm: FormGroup
  firebaseErrorMessage;

  constructor(private authService: AuthService, private router: Router, private afAuth: AngularFireAuth) {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required),
    });

    this.firebaseErrorMessage = '';

  }

  get email() {
    return this.loginForm.get('email')
  }

  get password() {
    return this.loginForm.get('password')
  }

  loginUser() {
    if (this.loginForm.invalid)
      return;

    this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).then((result) => {
      if (result == null) {                                 // null is success, false means there was an error
        console.log('logging in...');
        this.router.navigate(['/home']);                // when the user is logged in, navigate them to home
      }
      else if (result.isValid == false) {
        console.log('login error', result);
        this.firebaseErrorMessage = result.message;
      }
    });
  }

}
