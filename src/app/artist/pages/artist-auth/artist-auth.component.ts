import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-artist-auth',
  templateUrl: './artist-auth.component.html',
  styleUrls: ['./artist-auth.component.scss']
})
export class ArtistAuthComponent implements OnInit {

  hide = true;

  loginForm: FormGroup;
  signupForm: FormGroup;

  isLoading: boolean;

  showLogin = true;
  showSignup = false;
  showForgotPassword = false;

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

}
