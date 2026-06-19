import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddPlaceFormComponent } from '../add-place-form/add-place-form';

@Component({
  selector: 'app-navbar-component',
  imports: [RouterLink, RouterLinkActive, ButtonModule, DialogModule, AddPlaceFormComponent],
  providers: [DialogService],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent {
  private dialogService = inject(DialogService);
  private ref: DynamicDialogRef | null | undefined = undefined;

  menuOpen = false;
  // isModalVisible = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  apriModaleNuovoLuogo(): void {
    this.ref = this.dialogService.open(AddPlaceFormComponent, {
      header: 'Aggiungi un Luogo',
      width: '45rem',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '1199px': '75vw',
        '575px': '90vw',
      },
    });

    if (this.ref) {
      this.ref.onClose.subscribe((nuovoLuogo) => {
        if (nuovoLuogo) {
          console.log('Il luogo è stato salvato con successo:', nuovoLuogo);
        }
      });
    }
  }
}
