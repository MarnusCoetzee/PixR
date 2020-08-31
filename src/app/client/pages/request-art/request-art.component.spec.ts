import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestArtComponent } from './request-art.component';

describe('RequestArtComponent', () => {
  let component: RequestArtComponent;
  let fixture: ComponentFixture<RequestArtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestArtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
