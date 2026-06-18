import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionTagPage } from './region-tag-page';

describe('RegionTagPageComponent', () => {
  let component: RegionTagPage;
  let fixture: ComponentFixture<RegionTagPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegionTagPage],
    }).compileComponents();

    fixture = TestBed.createComponent(RegionTagPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
