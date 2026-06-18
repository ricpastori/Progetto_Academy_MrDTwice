import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegionTagPageComponent } from './features/page/region-tag-page-component/region-tag-page-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RegionTagPageComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('frontend');
}
