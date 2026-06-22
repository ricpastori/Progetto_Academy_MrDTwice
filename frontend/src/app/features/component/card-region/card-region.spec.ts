import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { CardRegion } from './card-region';

describe('CardRegion', () => {
  let component: CardRegion;
  let fixture: ComponentFixture<CardRegion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardRegion],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CardRegion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('uses visible text instead of a heading as the linked card name', () => {
    fixture.componentRef.setInput('region', { id: '13', name: 'Abruzzo' });
    fixture.componentRef.setInput('linkToDetails', true);
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    const link = element.querySelector<HTMLAnchorElement>('a.region-card-link');
    const title = element.querySelector<HTMLElement>('.region-title');

    expect(element.querySelector('h1, h2, h3, h4, h5, h6')).toBeNull();
    expect(title?.textContent).toContain('Abruzzo');
    expect(link?.getAttribute('aria-labelledby')).toBe(title?.id);
  });
});
