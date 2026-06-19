import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCover } from './details-cover';

describe('DetailsCover', () => {
  let component: DetailsCover;
  let fixture: ComponentFixture<DetailsCover>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsCover],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsCover);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
