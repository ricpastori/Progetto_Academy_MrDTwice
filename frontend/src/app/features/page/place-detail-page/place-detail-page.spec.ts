import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceDetailPage } from './place-detail-page';

describe('PlaceDetailPage', () => {
  let component: PlaceDetailPage;
  let fixture: ComponentFixture<PlaceDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceDetailPage],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaceDetailPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
