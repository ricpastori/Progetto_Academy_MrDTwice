import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { CardRegion } from '../../component/card-region/card-region';
import { CardContentComponent } from '../../component/card-content-component/card-content-component';

import { Region, RegionService } from '../../../services/region-service';
import { Content, ContentService } from '../../../services/content-service';
import { SubTag, SubTagService } from '../../../services/sub-tag-service';
import { TagService } from '../../../services/tag-service';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, ButtonModule, CardRegion, CardContentComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {
  protected readonly regionService = inject(RegionService);
  protected readonly contentService = inject(ContentService);
  protected readonly subTagService = inject(SubTagService);
  protected readonly tagService = inject(TagService);
  private cdr = inject(ChangeDetectorRef);

  protected readonly regions = this.regionService.regions;
  protected readonly subTags = this.subTagService.subTags;

  protected recentPosts: Content[] = [];
  protected topRatedPosts: Content[] = [];

  ngOnInit(): void {
    this.loadHomePageData();
  }

  protected loadHomePageData(): void {
    this.regionService.getRegions();
    this.subTagService.getSubTags();
    this.tagService.getTags();

    // ID del tag da usare per filtrare i contenuti della homepage
    // Qui è hardcodato a '1', ma in futuro potrebbe arrivare da costante/config/backend
    const homepageTagId = '1';

    this.contentService.getLatestContentByRegionByTag(homepageTagId).subscribe({
      next: (data) => {
        this.recentPosts = data.slice(0, 4);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(error);
      },
    });

    this.contentService.getMostLikedContentByRegionByTag(homepageTagId).subscribe({
      next: (data) => {
        this.topRatedPosts = data.slice(0, 4);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  protected getFeaturedRegions(): Region[] {
    return this.regions().slice(0, 6);
  }

  protected getPlacesCount(region: Region): number {
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

  protected getRegionCity(region: Region): string {
    const regionSource = region as Region & {
      city?: string;
      capital?: string;
      featuredCity?: string;
    };

    return regionSource.city ?? regionSource.capital ?? regionSource.featuredCity ?? '';
  }

  protected getSubTagForContent(content: Content): SubTag {
    return (
      this.subTags().find((subTag) => subTag.id === content.sub_tag_id) ?? {
        id: '',
        tag_id: '',
        name: 'Categoria',
      }
    );
  }
}
