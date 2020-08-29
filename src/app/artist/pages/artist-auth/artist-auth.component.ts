import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artist-auth',
  templateUrl: './artist-auth.component.html',
  styleUrls: ['./artist-auth.component.scss']
})
export class ArtistAuthComponent implements OnInit {

  hide = true;

  rememberMe: boolean = false;
  agreeToTerms: boolean = false;

  loginForm: FormGroup;
  signupForm: FormGroup;

  isLoading: boolean;

  showLogin = true;
  showSignup = false;
  showForgotPassword = false;

  staySignedIn: boolean;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private snackbar: MatSnackBar,
    private router: Router
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
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
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

  // get email address from form
  get email() {
    return this.signupForm.get('email');
  }
  // get user details
  get firstName() {
    return this.signupForm.get('firstName');
  }
  get lastName() {
    return this.signupForm.get('lastName');
  }
  get userName() {
    return this.signupForm.get('userName');
  }

  async onClickSignup() {
    // start the loading spinner
    this.isLoading = true;
    const pass1 = this.pass1.value;
    const pass2 = this.pass2.value;
    const email = this.email.value;
    const firstName = this.firstName.value;
    const lastName = this.lastName.value;
    const userName = this.lastName.value;
    if (pass1 !== pass2) {
      // passwords do not match, alert user and return
      alert('Passwords do not match');
      this.isLoading = false;
      return;
      // check to see if passwords match
    } else if (pass1 === pass2) {
      this.isLoading = true;
      try {
        // step 1 - authenticate using firebase auth API
        // set persistence to local
        await this.afAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          this.afAuth.createUserWithEmailAndPassword(email, pass1)
          .then(async (user) => {
            // after the user is created, await their uid to be able to store their basic information in the database
            const uid = await user.user.uid;
            this.db.collection('users').doc(uid).set({
              // add the details from the user to the db
              uid,
              email,
              firstName,
              lastName,
              userName,
              isArtist: true,
              imgUrl: 'https://eecs.ceas.uc.edu/DDEL/images/default_display_picture.png/@@images/image.png',
              hasRating: false,
              ratingsCount: 0,
              ratingsTotal: 0,
              isFeatured: false
            }).then(() => {
              this.isLoading = false;
              let snackbarRef = this.snackbar.open('Successfully created account!', 'Okay', {
                duration: 1000
              });
            }).then(() => {
              this.isLoading = false;
              this.router.navigate(['artist/dashboard']);
            }).catch(error => {
              console.log(error);
            })
          })
        });
      } catch (error) {
        this.isLoading = false;
        console.log(error);
        return;
      }
    }
  }

  async onClickLogin() {
    this.isLoading = true;
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    if (this.rememberMe === true) {
      await this.afAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        this.loginToFirebase(email, password)
        .then(() => {
          let snackbarRef = this.snackbar.open('Successfully logged in', 'Okay', {
            duration: 1000
          });
          this.isLoading = false;
          this.router.navigate(['artist/dashboard']);
        })
      }).catch((error) => {
        console.log(error);
        this.isLoading = false;
        return;
      });
    }

    if (!this.rememberMe === true) {
      await this.afAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        this.loginToFirebase(email, password)
        .then(() => {
          let snackbarRef = this.snackbar.open('Successfully logged in', 'Okay', {
            duration: 1000
          });
          this.isLoading = false;
          this.router.navigate(['artist/dashboard']);
        })
      }).catch((error) => {
        console.log(error);
        this.isLoading = false;
        return;
      });
    }
  }

  private loginToFirebase(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  changeCheckedValue(value) {
    this.rememberMe = !value;
  }

  changeAgreeToTermsValue(value) {
    this.agreeToTerms = !value;
  }

}
