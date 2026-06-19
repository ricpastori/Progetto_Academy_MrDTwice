import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { SkeletonModule } from 'primeng/skeleton';

import { Region, RegionService } from '../../../services/region-service';
import { CardRegion } from '../../component/card-region/card-region';

@Component({
  selector: 'app-regions-page',
  imports: [ButtonModule, MessageModule, SkeletonModule, CardRegion],
  templateUrl: './regions-page.html',
  styleUrl: './regions-page.css',
})
export class RegionsPage {
  protected readonly regionService = inject(RegionService);
  protected readonly regions = this.regionService.regions;
  protected readonly skeletonCards = Array.from({ length: 20 });

  constructor() {
    this.loadRegions();
  }

  protected loadRegions(): void {
    this.regionService.getRegions();
    // Carica il numero di contenuti per regione usato dalle card.
    this.regionService.getRegionsContentsCount();
  }

  protected getPlacesCount(region: Region): number {
    // Il service gestisce il fallback a 0 se il conteggio non è disponibile.
    return this.regionService.getRegionContentsCount(region.id);
  }
}
