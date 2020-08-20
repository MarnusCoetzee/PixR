import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [ClientComponent, LandingPageComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    MaterialModule
  ]
})
export class ClientModule { }
