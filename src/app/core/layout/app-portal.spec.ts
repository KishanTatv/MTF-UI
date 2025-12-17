import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPortal } from './app-portal';

describe('AppPortal', () => {
  let component: AppPortal;
  let fixture: ComponentFixture<AppPortal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppPortal],
    }).compileComponents();

    fixture = TestBed.createComponent(AppPortal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
