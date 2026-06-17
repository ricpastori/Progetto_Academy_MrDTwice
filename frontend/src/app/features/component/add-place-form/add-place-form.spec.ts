import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlaceForm } from './add-place-form';

describe('AddPlaceForm', () => {
  let component: AddPlaceForm;
  let fixture: ComponentFixture<AddPlaceForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPlaceForm],
    }).compileComponents();

    fixture = TestBed.createComponent(AddPlaceForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
