import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRegion } from './card-region';

describe('CardRegion', () => {
  let component: CardRegion;
  let fixture: ComponentFixture<CardRegion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardRegion],
    }).compileComponents();

    fixture = TestBed.createComponent(CardRegion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
