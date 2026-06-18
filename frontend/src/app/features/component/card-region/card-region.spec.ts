import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRegion } from './card-region';

describe('CardRegion', () => {
  let fixture: ComponentFixture<CardRegion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardRegion],
    }).compileComponents();

    fixture = TestBed.createComponent(CardRegion);
  });

  it('should render placeholders without region data', () => {
    fixture.detectChanges();

    const nativeElement: HTMLElement = fixture.nativeElement;

    expect(nativeElement.querySelector('h2')?.textContent?.trim()).toBe('Regione');
    expect(nativeElement.querySelector('p')?.textContent?.trim()).toBe('Luoghi in arrivo');
    expect(nativeElement.querySelector('img')?.getAttribute('src')).toBe(
      '/images/placeholders/region_placeholder.svg',
    );
    expect(nativeElement.querySelector('img')?.classList).toContain('region-image-placeholder');
  });

  it('should use the placeholder for broken images and reset when region changes', () => {
    fixture.componentRef.setInput('region', {
      name: 'Lazio',
      description: 'Roma',
      image: '/missing-region.jpg',
    });
    fixture.detectChanges();

    const image = fixture.nativeElement.querySelector('img') as HTMLImageElement;
    image.dispatchEvent(new Event('error'));
    fixture.detectChanges();

    expect(image.src).toContain('/images/placeholders/region_placeholder.svg');
    expect(image.classList).toContain('region-image-placeholder');

    fixture.componentRef.setInput('region', {
      name: 'Toscana',
      description: 'Firenze',
      image: '/images/regions/toscana.jpg',
    });
    fixture.detectChanges();

    expect(image.getAttribute('src')).toBe('/images/regions/toscana.jpg');
    expect(image.classList).not.toContain('region-image-placeholder');
  });
});
