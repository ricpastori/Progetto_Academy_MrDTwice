import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionsPage } from './regions-page';

describe('RegionsPage', () => {
  let component: RegionsPage;
  let fixture: ComponentFixture<RegionsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegionsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(RegionsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
