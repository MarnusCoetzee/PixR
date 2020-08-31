import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { MaterialModule } from '../material.module';
import { RequestArtComponent } from './pages/request-art/request-art.component';


@NgModule({
  declarations: [ClientComponent, LandingPageComponent, RequestArtComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    MaterialModule
  ]
})
export class ClientModule { }
