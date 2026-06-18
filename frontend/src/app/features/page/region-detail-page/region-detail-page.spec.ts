import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionDetailPage } from './region-detail-page';

describe('RegionDetailPage', () => {
  let component: RegionDetailPage;
  let fixture: ComponentFixture<RegionDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegionDetailPage],
    }).compileComponents();

    fixture = TestBed.createComponent(RegionDetailPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
