import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from '../../../environments/environment.prod';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase';
@Component({
  selector: 'app-admin-landing',
  templateUrl: './admin-landing.component.html',
  styleUrls: ['./admin-landing.component.scss']
})
export class AdminLandingComponent implements OnInit, OnDestroy {

  isLoading: boolean;

  adminId = environment.adminId;

  authSubscription: Subscription;

  showAuth: boolean;

  form: FormGroup;

  constructor(
    private afAuth: AngularFireAuth,
    private snackbar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.authSubscription = this.afAuth.authState.subscribe(authResult => {
      if (authResult) {
        // check if auth user is admin
        // is admin
        if (authResult.uid === this.adminId) {
          // is admin
          this.router.navigate(['admin/dashboard']);
        } else {
          // not admin
          let snackbar = this.snackbar.open('Must Be Admin', 'Ok').afterDismissed().subscribe(result => {
            this.router.navigate(['']);
            this.isLoading = false;
          });
        }
      } else {
        this.showAuth = true;
        this.isLoading = false;
      }
    });
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  // form actions

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  async onSubmit() {
    this.isLoading = true;

    const email = this.email.value;
    const password = this.password.value;

    try {
      await await this.afAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        this.afAuth.signInWithEmailAndPassword(email, password)
        .then((user) => {
          if (user.user.uid === this.adminId) {
            // user that logged in is admin
            // go to dashboard
            this.router.navigate(['admin/dashboard']);
          } else {
            // user that logged in is not the admin
            // not admin
            let snackbar = this.snackbar.open('Must Be Admin', 'Ok').afterDismissed().subscribe(() => {
              this.isLoading = false;
              this.afAuth.signOut();
              return;
            });
          }
        });
      });
    } catch (error) {
      console.log(error);
      this.isLoading = false;
      return;
    }
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }



}
