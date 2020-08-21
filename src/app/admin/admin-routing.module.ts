import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminLandingComponent } from './admin-landing/admin-landing.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: AdminLandingComponent },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
