import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionTagPageComponent } from './region-tag-page-component';

describe('RegionTagPageComponent', () => {
  let component: RegionTagPageComponent;
  let fixture: ComponentFixture<RegionTagPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegionTagPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegionTagPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
