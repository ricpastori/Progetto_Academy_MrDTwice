import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../app/features/component/navbar-component/navbar-component';
import { FooterComponent } from '../app/features/component/footer-component/footer-component';
import { RegionTagPageComponent } from './features/page/region-tag-page-component/region-tag-page-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, RegionTagPageComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend');
}
