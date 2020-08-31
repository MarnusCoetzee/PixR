import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { RequestArtComponent } from './pages/request-art/request-art.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'request-art', component: RequestArtComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
