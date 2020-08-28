import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-artist-auth',
  templateUrl: './artist-auth.component.html',
  styleUrls: ['./artist-auth.component.scss']
})
export class ArtistAuthComponent implements OnInit {

  hide = true;

  rememberMe: boolean = false;

  loginForm: FormGroup;
  signupForm: FormGroup;

  isLoading: boolean;

  showLogin = true;
  showSignup = false;
  showForgotPassword = false;

  staySignedIn: boolean;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initLoginForm();
    this.initSignupForm();
  }

  private initLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  private initSignupForm() {
    this.signupForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      userName: ['', Validators.required],
      pass1: ['', [Validators.required, Validators.minLength(6)]],
      pass2: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onClickShowSignup() {
    this.showSignup = true;
    this.showLogin = false;
    this.showForgotPassword = false;
  }

  onClickShowLogin() {
    this.showSignup = false;
    this.showLogin = true;
    this.showForgotPassword = false;
  }

  // get passwords
  get pass1() {
    return this.signupForm.get('pass1');
  }

  get pass2() {
    return this.signupForm.get('pass2');
  }

  // validate passwords
  validatePasswords() {
    const pass1 = this.pass1.value;
    const pass2 = this.pass2.value;

    if (pass1 !== pass2) {

    }
  }

  onClickSignup() {
    this.isLoading = true;
    const pass1 = this.pass1.value;
    const pass2 = this.pass2.value;
    if (pass1 !== pass2) {
      // passwords do not match, alert user and return
      alert('Passwords do not match');
      this.isLoading = false;
      return;
    } else if (pass1 === pass2) {
      try {

      } catch (error) {
        console.log(error);
        return;
      }
    }
    this.isLoading = false;
  }

  // get login details
  get loginemail() {
    return this.loginForm.value.email;
  }
  get password() {
    return this.loginForm.value.password;
  }

  onClickLogin() {
    this.isLoading = true;
    const email = this.loginemail.value;
    const password = this.password.value;
  }

  changeCheckedValue(value) {
    this.rememberMe = !value;
}

}
