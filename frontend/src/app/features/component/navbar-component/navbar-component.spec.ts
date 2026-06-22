import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { NavbarComponent } from './navbar-component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('uses native navigation links and identifies the current page', () => {
    const element: HTMLElement = fixture.nativeElement;
    const navigation = element.querySelector<HTMLElement>(
      'nav.mrd-navbar__navigation[aria-label="Navigazione principale"]',
    );

    expect(navigation).not.toBeNull();
    expect(navigation?.querySelectorAll('ul > li > a')).toHaveLength(3);
    expect(navigation?.querySelector('[role="tab"]')).toBeNull();
    expect(navigation?.querySelector('a[aria-current="page"]')?.textContent).toContain('Home');
  });
});
