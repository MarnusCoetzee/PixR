import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import * as firebase from 'firebase';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment.prod';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShellComponent } from './shared/shell/shell.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { ReactiveFormsModule } from '@angular/forms';
firebase.initializeApp(environment.firebase);
@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
