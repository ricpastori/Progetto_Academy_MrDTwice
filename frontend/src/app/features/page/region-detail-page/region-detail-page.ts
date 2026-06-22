import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';

import { RegionService, Region } from '../../../services/region-service';
import { TagService } from '../../../services/tag-service';
import { ContentService, Content } from '../../../services/content-service';
import { SubTagService } from '../../../services/sub-tag-service';

import { CardContentComponent } from '../../component/card-content-component/card-content-component';
import { DetailsCover } from '../../component/details-cover/details-cover';

@Component({
  selector: 'app-region-detail-page',
  standalone: true,
  imports: [
    RouterLink,
    BreadcrumbModule,
    ButtonModule,
    MessageModule,
    SkeletonModule,
    TagModule,
    CardContentComponent,
    DetailsCover,
  ],
  templateUrl: './region-detail-page.html',
  styleUrls: ['./region-detail-page.css'],
})
export class RegionDetailPage implements OnInit {
  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private regionService = inject(RegionService);

  private tagService = inject(TagService);

  private contentService = inject(ContentService);

  private subTagService = inject(SubTagService);

  private documentTitle = inject(Title);

  tags = this.tagService.tags;

  subTags = this.subTagService.subTags;

  selectedRegionId = signal<string>('');

  currentRegion = signal<Region | null>(null);

  regionContents = signal<Content[]>([]);

  isLoading = signal<boolean>(true);

  breadcrumbItems = computed<MenuItem[]>(() => [
    { label: 'Italia', routerLink: '/regioni' },
    { label: this.currentRegion()?.name ?? 'Regione' },
  ]);

  categoryIcons = ['ph ph-bank', 'ph ph-cooking-pot', 'ph ph-castle-turret', 'ph ph-tree'] as const;

  categorySeverities = [undefined, 'warn', 'info', 'success'] as const;

  pageLoading = computed(() => this.isLoading() || this.regionService.loading());

  contentsByCategory = computed(() => {
    const contents = this.regionContents();

    const subs = this.subTags();

    const map = new Map<string, Content[]>();

    contents.forEach((content) => {
      const sub = subs.find((s) => s.id === content.sub_tag_id);

      if (!sub) return;

      if (!map.has(sub.tag_id)) {
        map.set(sub.tag_id, []);
      }

      map.get(sub.tag_id)!.push(content);
    });

    return map;
  });

  constructor() {
    effect(() => {
      const regionId = this.selectedRegionId();

      if (!regionId) return;

      const region = this.regionService.regions().find((item) => String(item.id) === regionId);

      if (region) {
        this.currentRegion.set(region);
        this.documentTitle.setTitle(`${region.name} | Mr D Twice`);
      }
    });
  }

  ngOnInit() {
    // carica dati globali

    this.tagService.getTags();

    this.subTagService.getSubTags();

    this.route.queryParamMap.subscribe((params) => {
      const regionId = params.get('regionId');

      if (!regionId) {
        this.isLoading.set(false);

        return;
      }

      this.selectedRegionId.set(regionId);

      this.isLoading.set(true);

      this.regionService.getRegions();

      const region = this.regionService.regions().find((r) => String(r.id) === regionId);

      if (region) {
        this.currentRegion.set(region);
      }

      this.contentService.getContentByRegion(regionId).subscribe((contents) => {
        this.regionContents.set(contents);

        if (!this.currentRegion()) {
          const found = this.regionService.regions().find((r) => String(r.id) === regionId);

          this.currentRegion.set(found ?? null);
        }

        this.isLoading.set(false);
      });
    });
  }

  getContentsForTag(tagId: string) {
    return this.contentsByCategory().get(tagId) ?? [];
  }

  getCountForTag(tagId: string) {
    return this.getContentsForTag(tagId).length;
  }

  getSubTagById(id: string) {
    return (
      this.subTags().find((sub) => sub.id === id) ?? {
        id: '',
        name: '',
        tag_id: '',
      }
    );
  }

  getRegionImage(regionName: string) {
    const slug = regionName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/['’]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    return `/images/origin/regions/${slug}.jpg`;
  }

  onTagClick(tagId: string) {
    this.router.navigate(
      ['/regioni/regione-dettaglio/regione-tags'],

      {
        queryParams: {
          regionId: this.selectedRegionId(),

          tagId,
        },
      },
    );
  }
}
