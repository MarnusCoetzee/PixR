import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  isLoading: boolean;

  artistsSubscription: Subscription;

  featuredArtists: Array<any>;
  highestRatedArtists: Array<any>;
  allArtists: Array<any>;

  constructor(
    private db: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.getArtistsFromFirestore();
  }

  getArtistsFromFirestore() {
    this.isLoading = true;
    try {
      this.artistsSubscription = this.db.collection('users', ref => ref.where('isArtist', '==', true))
      .valueChanges()
      .subscribe(users => {
        console.log(users);
        // @ts-ignore
        this.featuredArtists = users.filter(featured => featured.isFeatured === true).slice(0, 9);
        // @ts-ignore
        this.highestRatedArtists = users.filter(highest => ((highest.ratingsTotal / highest.ratingsCount) > 4.5)).slice(0, 9);
        this.isLoading = false;
      });
    } catch (error) {
      console.log(error);
      this.isLoading = false;
      return;
    }
  }


}
