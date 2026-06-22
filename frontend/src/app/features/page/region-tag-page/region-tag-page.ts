import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CheckboxModule } from 'primeng/checkbox';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';

import { Content, ContentService } from '../../../services/content-service';
import { RegionService } from '../../../services/region-service';
import { SubTag, SubTagService } from '../../../services/sub-tag-service';
import { TagService } from '../../../services/tag-service';
import { CardContentComponent } from '../../component/card-content-component/card-content-component';

@Component({
  selector: 'app-region-tag-page',
  imports: [
    FormsModule,
    BreadcrumbModule,
    CheckboxModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    RadioButtonModule,
    SelectModule,
    CardContentComponent,
  ],
  templateUrl: './region-tag-page.html',
  styleUrl: './region-tag-page.css',
})
export class RegionTagPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly contentService = inject(ContentService);
  private readonly regionService = inject(RegionService);
  private readonly subTagService = inject(SubTagService);
  private readonly tagService = inject(TagService);
  private readonly documentTitle = inject(Title);

  protected readonly content = signal<Content[]>([]);
  protected readonly subTags = this.subTagService.subTags;
  protected readonly selectedRegionId = signal('');
  protected readonly selectedTagId = signal('');

  protected searchText = '';
  protected selectedCity = '';
  protected sortType = 'popular';
  protected readonly selectedSubTags = signal<string[]>([]);
  protected cities: string[] = [];

  protected readonly sortOptions = [
    { label: 'Popolari', value: 'popular' },
    { label: 'Più apprezzati', value: 'liked' },
    { label: 'Recenti', value: 'recent' },
  ] as const;

  constructor() {
    effect(() => {
      const region = this.regionService
        .regions()
        .find((item) => String(item.id) === String(this.selectedRegionId()));
      const tag = this.tagService
        .tags()
        .find((item) => String(item.id) === String(this.selectedTagId()));

      if (region && tag) {
        this.documentTitle.setTitle(`${tag.name} in ${region.name} | Mr D Twice`);
      }
    });
  }

  protected readonly filteredSubTags = computed(() => {
    const tagId = this.selectedTagId();

    if (!tagId) return [];

    return this.subTags().filter((subTag) => String(subTag.tag_id) === String(tagId));
  });

  protected readonly breadcrumbItems = computed<MenuItem[]>(() => {
    const regionId = this.selectedRegionId();
    const tagId = this.selectedTagId();
    const regionName =
      this.regionService.regions().find((region) => String(region.id) === String(regionId))?.name ??
      'Regione';
    const tagName =
      this.tagService.tags().find((tag) => String(tag.id) === String(tagId))?.name ?? 'Categoria';

    return [
      { label: 'Italia', routerLink: '/regioni' },
      {
        label: regionName,
        routerLink: '/regioni/regione-dettaglio',
        queryParams: { regionId },
      },
      { label: tagName },
    ];
  });

  ngOnInit(): void {
    this.regionService.getRegions();
    this.subTagService.getSubTags();
    this.tagService.getTags();

    this.route.queryParamMap.subscribe((params) => {
      const regionId = params.get('regionId');
      const tagId = params.get('tagId');

      if (!regionId || !tagId) return;

      this.selectedRegionId.set(regionId);
      this.selectedTagId.set(tagId);
      this.selectedSubTags.set([]);

      this.contentService.getContentByRegionAndTag(regionId, tagId).subscribe((data) => {
        this.content.set(data);
        this.loadCities(data);
      });
    });
  }

  protected getSubTag(id: string): SubTag {
    return (
      this.subTags().find((subTag) => String(subTag.id) === String(id)) ?? {
        id,
        tag_id: this.selectedTagId(),
        name: 'Categoria',
      }
    );
  }

  protected filteredContent(): Content[] {
    let data = [...this.content()];

    if (this.searchText.trim()) {
      const search = this.searchText.trim().toLocaleLowerCase('it-IT');
      data = data.filter((item) => item.place.toLocaleLowerCase('it-IT').includes(search));
    }

    if (this.selectedCity && this.selectedCity !== 'Tutte le città') {
      data = data.filter((item) => item.city === this.selectedCity);
    }

    if (this.selectedSubTags().length) {
      data = data.filter((item) => this.selectedSubTags().includes(item.sub_tag_id));
    }

    if (this.sortType === 'recent') {
      data.sort(
        (first, second) =>
          new Date(second.created_at).getTime() - new Date(first.created_at).getTime(),
      );
    } else if (this.sortType === 'liked') {
      data.sort((first, second) => second.likes - first.likes);
    } else {
      data.sort((first, second) => second.likes - second.dislikes - (first.likes - first.dislikes));
    }

    return data;
  }

  protected toggleSubTag(id: string): void {
    const current = this.selectedSubTags();

    this.selectedSubTags.set(
      current.includes(id) ? current.filter((subTagId) => subTagId !== id) : [...current, id],
    );
  }

  private loadCities(data: Content[]): void {
    const cities = data.map((item) => item.city).filter(Boolean);

    this.cities = ['Tutte le città', ...new Set(cities)];
  }
}
