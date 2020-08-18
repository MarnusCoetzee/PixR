import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-artist-auth',
  templateUrl: './artist-auth.component.html',
  styleUrls: ['./artist-auth.component.scss']
})
export class ArtistAuthComponent implements OnInit {

  authSubscription: Subscription;

  isLoading = false;

  form: FormGroup;

  type: 'login' | 'signup' | 'reset' = 'signup';

  serverMessage: string;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6), Validators.required]],
      passwordConfirm: ['', []]
    });
  }

  changeType(val) {
    this.type = val;
  }

  get isLogin() {
    return this.type === 'login';
  }

  get isSignup() {
    return this.type === 'signup';
  }

  get isPasswordReset() {
    return this.type === 'reset';
  }

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }

  get passwordDoesMatch() {
    if (this.type !== 'signup') {
      return true;
    } else {
      return this.password.value === this.passwordConfirm.value;
    }
  }

      // tslint:disable-next-line: typedef
  async onSubmit() {
    this.isLoading = true;

    const email = this.email.value;
    const password = this.password.value;

    try {
      if (this.isLogin) {
        await this.afAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => this.afAuth.signInWithEmailAndPassword(email, password))
        .then(() => this.router.navigate(['artist/dashboard']));
      }
      if (this.isSignup) {
        await this.afAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => this.afAuth.createUserWithEmailAndPassword(email, password))
        .then((data) => {
          const uid = data.user.uid;
          this.db.collection('users').doc(uid).set({uid, email});
        })
        .then(() => this.router.navigate(['artist/create-profile']));
      }
      if (this.isPasswordReset) {
        await this.afAuth.sendPasswordResetEmail(email);
        this.serverMessage = 'Check Your Email';
      }
    } catch (err) {
      this.serverMessage = err;
    }

    this.isLoading = false;
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
  

}
