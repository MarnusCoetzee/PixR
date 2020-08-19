import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {

  isLoading: boolean;

  form: FormGroup;

  authSubscription: Subscription;
  uid: string;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // initialise page
    this.isLoading = true;
    // get auth state to process uid
    this.authSubscription = this.afAuth.authState.subscribe(authResult => {
      if (authResult) {
        this.uid = authResult.uid;
        this.isLoading = false;
      } else {
        console.log('error');
      }
    });
    // build form
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  // get details from form
  get firstName() {
    return this.form.get('firstName');
  }
  get lastName() {
    return this.form.get('lastName');
  }

  onSubmit() {
    this.isLoading = true;

    const firstName = this.firstName.value;
    const lastName = this.lastName.value;
    try {
      this.db.collection('users').doc(this.uid).update({
        firstName,
        lastName
      }).then(() => {
        let snackbarRef = this.snackBar.open('Successfully Added Information!');
      }).then(() => {
        this.router.navigate(['artist/dashboard']);
      });
    } catch (error) {
      console.log(error);
      this.isLoading = false;
      return;
    }
  }

}
