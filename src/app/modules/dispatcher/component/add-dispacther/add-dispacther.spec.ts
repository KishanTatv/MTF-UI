import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDispacther } from './add-dispacther';

describe('AddDispacther', () => {
  let component: AddDispacther;
  let fixture: ComponentFixture<AddDispacther>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDispacther]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDispacther);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
