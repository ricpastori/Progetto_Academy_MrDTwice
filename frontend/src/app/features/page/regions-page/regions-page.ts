import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { SkeletonModule } from 'primeng/skeleton';

import { Region, RegionService } from '../../../services/region-service';
import { CardRegion } from '../../component/card-region/card-region';

@Component({
  selector: 'app-regions-page',
  imports: [RouterLink, ButtonModule, MessageModule, SkeletonModule, CardRegion],
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
  }

  protected getPlacesCount(region: Region): number {
    // Il backend puo' esporre il conteggio con nomi diversi: la card vuole solo un numero.
    const countSource = region as Region & {
      placesCount?: number;
      places_count?: number;
      contentCount?: number;
      content_count?: number;
    };
    const count = Number(
      countSource.placesCount ??
        countSource.places_count ??
        countSource.contentCount ??
        countSource.content_count ??
        0,
    );

    return Number.isFinite(count) ? count : 0;
  }
}
