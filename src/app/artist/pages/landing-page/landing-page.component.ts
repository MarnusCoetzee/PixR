import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  authSubscription: Subscription;

  isLoading: boolean;

  showAuth = false;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    // step 1 - check if user is authenticated
    this.authSubscription = this.afAuth.authState.subscribe(authResult => {
      if (authResult) {
        // user is authenticated - navigate them to dashboard
        this.router.navigate(['artist/dashboard']);
      } else {
        // show the authentication component
        this.showAuth = true;
        this.isLoading = false;
      }
    });
  }

}
