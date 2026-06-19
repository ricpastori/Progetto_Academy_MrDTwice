import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

import { Content, ContentService } from '../../../services/content-service';
import { RegionService } from '../../../services/region-service';
import { SubTagService } from '../../../services/sub-tag-service';
import { TagService } from '../../../services/tag-service';
import { DetailsCover } from '../../component/details-cover/details-cover';

@Component({
  selector: 'app-content-details',
  imports: [
    BreadcrumbModule,
    ButtonModule,
    CardModule,
    MessageModule,
    SkeletonModule,
    TagModule,
    TooltipModule,
    DetailsCover,
  ],
  templateUrl: './content-details.html',
  styleUrl: './content-details.css',
})
export class ContentDetails implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly contentService = inject(ContentService);
  private readonly regionService = inject(RegionService);
  private readonly tagService = inject(TagService);
  private readonly subTagService = inject(SubTagService);

  protected readonly content = signal<Content | null>(null);
  protected readonly isLoading = signal(true);
  protected readonly errorMessage = signal('');
  protected readonly breadcrumbItems = signal<MenuItem[]>([
    { label: 'Italia', routerLink: '/regioni' },
  ]);

  ngOnInit(): void {
    this.regionService.getRegions();
    this.tagService.getTags();
    this.subTagService.getSubTags();

    this.route.queryParamMap.subscribe((queryParamMap) => {
      this.loadContent(queryParamMap.get('id'));
    });
  }

  protected formatDate(value: string | null | undefined): string {
    const parsedDate = parseContentDate(value);

    if (!parsedDate) return 'Non disponibile';

    return parsedDate.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  protected coverImage(content: Content): string {
    const regionImage = this.regionService.regions().find((region) => region.id === content.region_id)?.image;

    return content.image_url?.trim() || regionImage || 'placeholders/region_placeholder.svg';
  }

  protected locationLabel(content: Content): string {
    return [content.city, this.regionName(content)].filter(Boolean).join(', ');
  }

  protected regionName(content: Content): string {
    return this.regionService.regions().find((region) => region.id === content.region_id)?.name ?? '';
  }

  protected tagName(content: Content): string {
    return this.tagService.tags().find((tag) => tag.id === content.tag_id)?.name ?? 'Non disponibile';
  }

  protected subTagName(content: Content): string {
    return (
      this.subTagService.subTags().find((subTag) => subTag.id === content.sub_tag_id)?.name ??
      'Categoria'
    );
  }

  private loadContent(contentId: string | null): void {
    this.content.set(null);
    this.errorMessage.set('');

    if (!contentId) {
      this.isLoading.set(false);
      this.errorMessage.set('Nessun contenuto selezionato.');
      return;
    }

    this.isLoading.set(true);

    this.contentService.getContentById(contentId).subscribe({
      next: (content) => this.setContent(content),
      error: () => {
        this.isLoading.set(false);
        this.errorMessage.set('Contenuto non trovato.');
      },
    });
  }

  private setContent(content: Content): void {
    this.content.set(content);
    this.isLoading.set(false);
    this.breadcrumbItems.set([
      { label: 'Italia', routerLink: '/regioni' },
      { label: content.place },
    ]);
  }
}

function parseContentDate(value: string | null | undefined): Date | null {
  if (!value) return null;

  const parsedDate = new Date(value.replace(' ', 'T'));

  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
}
