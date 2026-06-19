import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, input, linkedSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

import { Region } from '../../../services/region-service';
import { ResponsiveImage } from '../responsive-image/responsive-image';

// Fallback unico per dati mancanti, incompleti o immagini non caricabili.
const REGION_PLACEHOLDER = {
  name: 'Regione',
  description: 'Luoghi in arrivo',
  image: '/images/origin/placeholders/region_placeholder.svg',
} satisfies Pick<Region, 'name' | 'description' | 'image'>;

const REGION_IMAGE_DIR = '/images/origin/regions';
const REGION_IMAGE_EXTENSION = 'jpg';

@Component({
  selector: 'app-card-region',
  imports: [NgTemplateOutlet, RouterLink, CardModule, TagModule, TooltipModule, ResponsiveImage],
  templateUrl: './card-region.html',
  styleUrl: './card-region.css',
})
export class CardRegion {
  // Input ricevuti dalla pagina: possono essere null/parziali perché arrivano da API o stato asincrono.
  readonly region = input<Partial<Region> | null>();
  readonly city = input<string | null>('');
  readonly placesCount = input<number | null>(0);
  readonly compact = input(false);
  readonly linkToDetails = input(false);

  protected readonly regionId = computed(() => this.region()?.id ?? null);
  protected readonly isLinked = computed(() => this.linkToDetails() && this.regionId() !== null);

  // Oggetto "pulito" usato dal template: qui centralizziamo fallback e normalizzazione dei dati.
  protected readonly card = computed(() => {
    const region = this.region();
    const regionName = region?.name?.trim();
    const localImage = this.getLocalImageSrc(regionName);

    return {
      name: regionName || REGION_PLACEHOLDER.name,
      description: region?.description?.trim() || REGION_PLACEHOLDER.description,
      image: region?.image?.trim() || localImage || REGION_PLACEHOLDER.image,
      localImage,
    };
  });

  // Se la pagina passa una città la mostriamo come sottotitolo, altrimenti usiamo la descrizione regione.
  protected readonly subtitle = computed(() => this.city()?.trim() || this.card().description);

  // Si riallinea quando cambia la regione, ma resta scrivibile per reagire agli errori immagine.
  protected readonly imageSrc = linkedSignal(() => this.card().image);
  protected readonly isPlaceholderImage = computed(
    () => this.imageSrc() === REGION_PLACEHOLDER.image,
  );
  // Protegge il template da valori non numerici e gestisce singolare/plurale.
  protected readonly placesLabel = computed(() => {
    const count = Number(this.placesCount() ?? 0);
    const safeCount = Number.isFinite(count) ? Math.max(0, Math.trunc(count)) : 0;

    return `${safeCount} ${safeCount === 1 ? 'luogo' : 'luoghi'}`;
  });

  protected useFallbackImage(): void {
    const localImage = this.card().localImage;

    // Prima prova: se l'API ha fornito una URL rotta, proviamo l'immagine locale generata dallo slug.
    if (localImage && this.imageSrc() !== localImage) {
      this.imageSrc.set(localImage);
      return;
    }

    // Evita loop di errore se anche il placeholder dovesse non caricarsi.
    if (this.isPlaceholderImage()) {
      return;
    }

    this.imageSrc.set(REGION_PLACEHOLDER.image);
  }

  private getLocalImageSrc(regionName: string | undefined): string | null {
    // La convenzione degli asset è /images/origin/regions/nome-regione.jpg.
    // Esempio: "Valle d'Aosta" diventa "valle-daosta.jpg".
    const slug = regionName
      ?.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/['’]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    return slug ? `${REGION_IMAGE_DIR}/${slug}.${REGION_IMAGE_EXTENSION}` : null;
  }
}
