import { Component, computed, input, output } from '@angular/core';

import { ResponsiveImage } from '../responsive-image/responsive-image';

type DetailsCoverImageSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
type DetailsCoverLoading = 'eager' | 'lazy';
type DetailsCoverDecoding = 'async' | 'sync' | 'auto';
type DetailsCoverFetchPriority = 'high' | 'low' | 'auto';

// Cover riutilizzabile per le pagine di dettaglio.
// Se riceve title/subtitle mostra l'overlay scuro con testo; senza testi resta una cover solo immagine.
@Component({
  selector: 'app-details-cover',
  imports: [ResponsiveImage],
  templateUrl: './details-cover.html',
  styleUrl: './details-cover.css',
})
export class DetailsCover {
  // src viene passato direttamente a ResponsiveImage, che si occupa di normalizzare asset locali e URL esterni.
  readonly src = input<string | null>(null);
  readonly alt = input('');

  // title e subtitle sono opzionali: la loro presenza attiva la variante con contenuto sovrapposto.
  readonly title = input<string | null>(null);
  readonly subtitle = input<string | null>(null);

  // Questi input espongono solo le opzioni immagine utili alla cover, mantenendo qui l'API semplice.
  readonly size = input<DetailsCoverImageSize>('full');
  readonly loading = input<DetailsCoverLoading>('lazy');
  readonly decoding = input<DetailsCoverDecoding>('async');
  readonly fetchPriority = input<DetailsCoverFetchPriority | null>(null);

  // Propaghiamo l'errore dell'immagine al padre, così ogni pagina può scegliere il proprio fallback.
  readonly imageError = output<Event>();

  // I computed ripuliscono i testi una volta sola e tengono il template libero da controlli ripetuti.
  protected readonly displayTitle = computed(() => this.title()?.trim() ?? '');
  protected readonly displaySubtitle = computed(() => this.subtitle()?.trim() ?? '');
  protected readonly hasTextContent = computed(
    () => Boolean(this.displayTitle()) || Boolean(this.displaySubtitle()),
  );

  protected emitImageError(event: Event): void {
    this.imageError.emit(event);
  }
}
