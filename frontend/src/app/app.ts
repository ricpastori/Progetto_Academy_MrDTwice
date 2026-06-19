import { Component, signal } from '@angular/core';
import { NavbarComponent } from '../app/features/component/navbar-component/navbar-component';
import { FooterComponent } from '../app/features/component/footer-component/footer-component';
import { AppShell } from './features/component/app-shell/app-shell';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, AppShell, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend');
}
