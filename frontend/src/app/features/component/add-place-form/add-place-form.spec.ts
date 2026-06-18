import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlaceFormComponent } from './add-place-form';

describe('AddPlaceForm', () => {
  let component: AddPlaceFormComponent;
  let fixture: ComponentFixture<AddPlaceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPlaceFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddPlaceFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
