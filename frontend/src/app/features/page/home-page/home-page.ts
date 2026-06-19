import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
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

  private readonly cd = inject(ChangeDetectorRef);

  protected readonly regions = this.regionService.regions;

  protected readonly subTags = this.subTagService.subTags;

  protected recentPosts: Content[] = [];

  protected topRatedPosts: Content[] = [];

  ngOnInit(): void {
    this.loadHomePageData();
  }

  protected loadHomePageData(): void {
    this.regionService.getRegions();

    this.regionService.getRegionsContentsCount();

    this.subTagService.getSubTags();

    this.tagService.getTags();

    this.contentService
      .getLatestContentByRegion()

      .subscribe({
        next: (data: Content[]) => {
          this.recentPosts = data.slice(0, 10);

          this.cd.detectChanges();
        },

        error: (error) => {
          console.error('Errore caricamento recenti', error);
        },
      });

    this.contentService
      .getMostLikedContentByRegion()

      .subscribe({
        next: (data: Content[]) => {
          this.topRatedPosts = data.slice(0, 10);

          this.cd.detectChanges();
        },

        error: (error) => {
          console.error('Errore caricamento like', error);
        },
      });
  }

  protected getFeaturedRegions(): Region[] {
    return this.regions().slice(0, 6);
  }

  protected getPlacesCount(region: Region): number {
    return this.regionService.getRegionContentsCount(region.id) ?? 0;
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
      this.subTags()

        .find((subTag) => String(subTag.id) === String(content.sub_tag_id)) ?? {
        id: '',
        tag_id: '',
        name: 'Categoria',
      }
    );
  }
}
