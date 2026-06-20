import { NgClass } from '@angular/common';
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
import { TagService } from '../../../services/tag-service';
import { SubTagService } from '../../../services/sub-tag-service';

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
    NgClass,
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

  protected readonly regionId = signal<string | null>(null);

  protected readonly tagId = signal<string | null>(null);

  protected readonly isLoading = signal(true);

  protected readonly errorMessage = signal('');

  protected readonly breadcrumbItems = signal<MenuItem[]>([]);

  likes = signal(0);

  dislikes = signal(0);

  likeAnimation = signal(false);

  dislikeAnimation = signal(false);

  reactionAnnouncement = signal('');

  ngOnInit(): void {
    this.regionService.getRegions();

    this.tagService.getTags();

    this.subTagService.getSubTags();

    const state = history.state;

    if (state?.regionId) {
      this.regionId.set(state.regionId);
    }

    if (state?.tagId) {
      this.tagId.set(state.tagId);
    }

    this.route.queryParamMap.subscribe((params) => {
      this.loadContent(params.get('id'));
    });
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

    this.likes.set(content.likes ?? 0);

    this.dislikes.set(content.dislikes ?? 0);

    this.setBreadcrumb(content);

    this.isLoading.set(false);
  }

  private setBreadcrumb(content: Content): void {
    const items: MenuItem[] = [];

    const regionId = this.regionId();

    const tagId = this.tagId();

    if (regionId) {
      const region = this.regionService
        .regions()
        .find((item) => String(item.id) === String(regionId));

      items.push({
        label: 'Italia',

        routerLink: '/regioni',
      });

      if (region) {
        items.push({
          label: region.name,

          routerLink: '/regioni/regione-dettaglio',

          queryParams: {
            regionId,
          },
        });
      }

      if (tagId) {
        const tag = this.tagService.tags().find((item) => String(item.id) === String(tagId));

        if (tag) {
          items.push({
            label: tag.name,

            routerLink: '/regioni/regione-dettaglio/regione-tags',

            queryParams: {
              regionId,

              tagId,
            },
          });
        }
      }
    } else {
      items.push({
        label: 'Italia',

        routerLink: '/regioni',
      });
    }

    items.push({
      label: content.place,
    });

    this.breadcrumbItems.set(items);
  }

  protected formatDate(value: string | null | undefined): string {
    if (!value) return '';

    const date = new Date(value.replace(' ', 'T'));

    if (Number.isNaN(date.getTime())) return '';

    return date.toLocaleDateString('it-IT', {
      day: '2-digit',

      month: '2-digit',

      year: 'numeric',
    });
  }

  protected regionName(content: Content): string {
    return (
      this.regionService

        .regions()

        .find((region) => region.id === content.region_id)?.name ?? ''
    );
  }

  protected tagName(content: Content): string {
    return (
      this.tagService

        .tags()

        .find((tag) => tag.id === content.tag_id)?.name ?? 'Non disponibile'
    );
  }

  protected subTagName(content: Content): string {
    return (
      this.subTagService

        .subTags()

        .find((subTag) => subTag.id === content.sub_tag_id)?.name ?? 'Categoria'
    );
  }

  protected coverImage(content: Content): string {
    const image = this.regionService

      .regions()

      .find((region) => region.id === content.region_id)?.image;

    return content.image_url?.trim() || image || 'placeholders/region_placeholder.svg';
  }

  protected locationLabel(content: Content): string {
    return [content.city, this.regionName(content)]

      .filter(Boolean)

      .join(', ');
  }

  addLike(): void {
    this.likeAnimation.set(true);

    setTimeout(() => {
      this.likeAnimation.set(false);
    }, 300);

    this.contentService.addLike(this.content()!.id).subscribe({
      next: (updated) => {
        this.likes.set(updated.likes);
      },
    });
  }

  addDislike(): void {
    this.dislikeAnimation.set(true);

    setTimeout(() => {
      this.dislikeAnimation.set(false);
    }, 300);

    this.contentService.addDislike(this.content()!.id).subscribe({
      next: (updated) => {
        this.dislikes.set(updated.dislikes);
      },
    });
  }
}
