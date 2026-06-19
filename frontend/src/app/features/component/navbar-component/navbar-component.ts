import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TabsModule } from 'primeng/tabs';
import { TooltipModule } from 'primeng/tooltip';
import { filter } from 'rxjs';
import { AddPlaceFormComponent } from '../add-place-form/add-place-form';

@Component({
  selector: 'app-add-place-dialog-close-icon',
  imports: [TooltipModule],
  template: `
    <i
      class="p-button-icon ph ph-x"
      pTooltip="Chiudi"
      tooltipPosition="left"
      aria-hidden="true"
    ></i>
  `,
})
class AddPlaceDialogCloseIcon {}

@Component({
  selector: 'app-navbar-component',
  imports: [RouterLink, ButtonModule, TabsModule, TooltipModule],
  providers: [DialogService],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css',
})
export class NavbarComponent {
  private dialogService = inject(DialogService);
  private router = inject(Router);
  private ref: DynamicDialogRef | null | undefined = undefined;

  protected readonly navigationItems = [
    { label: 'Home', route: '/', icon: 'ph ph-house' },
    { label: 'Regioni', route: '/regioni', icon: 'ph ph-map-pin' },
    { label: 'Chi siamo', route: '/chi-siamo', icon: 'ph ph-info' },
  ] as const;

  protected readonly activeTab = signal(this.getActiveTab(this.router.url));

  menuOpen = false;

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((event) => {
        this.activeTab.set(this.getActiveTab(event.urlAfterRedirects));
      });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  apriModaleNuovoLuogo(): void {
    this.ref = this.dialogService.open(AddPlaceFormComponent, {
      header: 'Aggiungi un Luogo',
      width: '45rem',
      modal: true,
      closable: true,
      closeOnEscape: true,
      dismissableMask: false,
      draggable: false,
      resizable: false,
      autoZIndex: true,
      baseZIndex: 2000,
      maskStyleClass: 'add-place-dialog-mask',
      closeAriaLabel: 'Chiudi',
      templates: { closeicon: AddPlaceDialogCloseIcon },
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

  private getActiveTab(url: string): string {
    const path = url.split(/[?#]/, 1)[0];

    if (path === '/') return '/';
    if (path.startsWith('/regioni')) return '/regioni';
    if (path.startsWith('/chi-siamo')) return '/chi-siamo';

    return '';
  }
}
