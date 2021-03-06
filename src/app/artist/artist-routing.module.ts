import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreateProfileComponent } from './pages/create-profile/create-profile.component';
import { ArtistAuthComponent } from './pages/artist-auth/artist-auth.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'auth', component: ArtistAuthComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'create-profile', component: CreateProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtistRoutingModule { }
