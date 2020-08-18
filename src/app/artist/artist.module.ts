import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistRoutingModule } from './artist-routing.module';
import { ArtistComponent } from './artist.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MaterialModule } from '../material.module';
import { ArtistAuthComponent } from './pages/artist-auth/artist-auth.component';
import { CreateProfileComponent } from './pages/create-profile/create-profile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ArtistComponent, LandingPageComponent, DashboardComponent, ArtistAuthComponent, CreateProfileComponent],
  imports: [
    CommonModule,
    ArtistRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ArtistModule { }
