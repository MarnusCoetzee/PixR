import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userDetails: any;
  authSubscription: Subscription;
  userDetailsSubscription: Subscription;
  userId: string;

  isLoading: boolean;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.authSubscription = this.afAuth.authState.subscribe(authResult => {
      if (authResult) {
         this.userId = authResult.uid;
         this.userDetailsSubscription = this.db.collection('users').doc(this.userId).valueChanges()
         .subscribe(userResult => {
           if (userResult) {
             this.userDetails = userResult;
             this.isLoading = false;
           }
         });
      } else if(!authResult) {
        let snackbarRef = this.snackbar.open('Must be signed in');
        this.router.navigate(['']);
      }
    });
  }

}
