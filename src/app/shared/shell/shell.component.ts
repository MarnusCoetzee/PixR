import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map, shareReplay } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
  }

  onClickNavigateProducts() {
    this.router.navigate(['']);
  }
  onClickNavigateCart() {
    this.router.navigate(['']);
  }

  onClickLogout() {
    this.afAuth.signOut();
  }

}
