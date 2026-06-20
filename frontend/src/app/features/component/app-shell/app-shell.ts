import { Component, DestroyRef, ElementRef, inject, signal, viewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

export const APP_SHELL_DATA_KEY = 'appShell';

export type AppShellLayout = 'contained' | 'fluid';
export type AppShellTone = 'surface' | 'soft' | 'muted';

export interface AppShellConfig {
  layout?: AppShellLayout;
  tone?: AppShellTone;
}

const DEFAULT_CONFIG: Required<AppShellConfig> = {
  layout: 'contained',
  tone: 'soft',
};

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.css',
})
export class AppShell {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly documentTitle = inject(Title);
  private readonly destroyRef = inject(DestroyRef);
  private readonly mainContent = viewChild<ElementRef<HTMLElement>>('mainContent');

  private navigationAnnouncementTimer: ReturnType<typeof setTimeout> | null = null;

  protected readonly config = signal(DEFAULT_CONFIG);
  protected readonly pageAnnouncement = signal('');

  constructor() {
    this.updateConfig();

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.updateConfig();
        this.focusAndAnnounceNavigation();
      });

    this.destroyRef.onDestroy(() => {
      if (this.navigationAnnouncementTimer) {
        clearTimeout(this.navigationAnnouncementTimer);
      }
    });
  }

  private updateConfig(): void {
    let activeRoute = this.activatedRoute;

    while (activeRoute.firstChild) {
      activeRoute = activeRoute.firstChild;
    }

    const routeConfig = activeRoute.snapshot.data[APP_SHELL_DATA_KEY] as AppShellConfig | undefined;

    this.config.set({ ...DEFAULT_CONFIG, ...routeConfig });
  }

  private focusAndAnnounceNavigation(): void {
    if (this.navigationAnnouncementTimer) {
      clearTimeout(this.navigationAnnouncementTimer);
    }

    // Svuotare prima la live region permette di annunciare anche navigazioni con lo stesso titolo.
    this.pageAnnouncement.set('');

    this.navigationAnnouncementTimer = setTimeout(() => {
      this.mainContent()?.nativeElement.focus();
      this.pageAnnouncement.set(`Pagina caricata: ${this.documentTitle.getTitle()}`);
      this.navigationAnnouncementTimer = null;
    });
  }
}
