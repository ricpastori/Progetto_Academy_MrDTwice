import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { AddPlaceFormComponent } from '../add-place-form/add-place-form';

@Component({
  selector: 'app-navbar-component',
  imports: [RouterLink, RouterLinkActive, ButtonModule, DialogModule, AddPlaceFormComponent],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent {
  menuOpen = false;
  isModalVisible = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  showModal(): void {
    this.isModalVisible = true;
  }
}
