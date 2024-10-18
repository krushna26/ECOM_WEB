import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerhomeComponent } from './retailerhome.component';

describe('RetailerhomeComponent', () => {
  let component: RetailerhomeComponent;
  let fixture: ComponentFixture<RetailerhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerhomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
