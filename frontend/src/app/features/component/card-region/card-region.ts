import { Component, computed, input, linkedSignal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

import { Region } from '../../../services/region-service';

// Fallback unico per dati mancanti, incompleti o immagini non caricabili.
const REGION_PLACEHOLDER = {
  name: 'Regione',
  description: 'Luoghi in arrivo',
  image: '/images/placeholders/region_placeholder.svg',
} satisfies Pick<Region, 'name' | 'description' | 'image'>;

@Component({
  selector: 'app-card-region',
  imports: [CardModule, TagModule],
  templateUrl: './card-region.html',
  styleUrl: './card-region.css',
})
export class CardRegion {
  readonly region = input<Partial<Region> | null>();
  readonly city = input<string | null>('');
  readonly placesCount = input<number | null>(0);

  protected readonly card = computed(() => {
    const region = this.region();

    return {
      name: region?.name?.trim() || REGION_PLACEHOLDER.name,
      description: region?.description?.trim() || REGION_PLACEHOLDER.description,
      image: region?.image?.trim() || REGION_PLACEHOLDER.image,
    };
  });

  protected readonly subtitle = computed(() => this.city()?.trim() || this.card().description);

  // Si aggiorna quando cambia la regione, ma resta scrivibile per gestire l'errore immagine.
  protected readonly imageSrc = linkedSignal(() => this.card().image);
  protected readonly isPlaceholderImage = computed(
    () => this.imageSrc() === REGION_PLACEHOLDER.image,
  );
  protected readonly placesLabel = computed(() => {
    const count = Number(this.placesCount() ?? 0);
    const safeCount = Number.isFinite(count) ? Math.max(0, Math.trunc(count)) : 0;

    return `${safeCount} ${safeCount === 1 ? 'luogo' : 'luoghi'}`;
  });

  // Evita loop di errore se anche il placeholder dovesse non caricarsi.
  protected usePlaceholderImage(): void {
    if (this.isPlaceholderImage()) {
      return;
    }

    this.imageSrc.set(REGION_PLACEHOLDER.image);
  }
}
