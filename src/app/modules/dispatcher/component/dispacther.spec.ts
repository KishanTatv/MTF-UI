import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dispacther } from './dispacther';

describe('Dispacther', () => {
  let component: Dispacther;
  let fixture: ComponentFixture<Dispacther>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dispacther]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dispacther);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
