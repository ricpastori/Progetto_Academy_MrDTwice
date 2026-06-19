import { NgClass } from '@angular/common';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ContentService, Content } from '../../../services/content-service';
import { SubTag } from '../../../services/sub-tag-service';

@Component({
  selector: 'app-card-content-component',
  imports: [CardModule, NgClass, RouterLink],
  templateUrl: './card-content-component.html',
  styleUrl: './card-content-component.css',
})
export class CardContentComponent implements OnInit {
  private contentService = inject(ContentService);

  content = input.required<Content>();

  subTag = input.required<SubTag>();

  likes = signal(0);

  dislikes = signal(0);

  likeAnimation = signal(false);

  dislikeAnimation = signal(false);

  ngOnInit(): void {
    this.likes.set(this.content().likes ?? 0);
    this.dislikes.set(this.content().dislikes ?? 0);
  }

  addLike(): void {
    this.likeAnimation.set(true);

    setTimeout(() => {
      this.likeAnimation.set(false);
    }, 300);

    this.contentService.addLike(this.content().id).subscribe({
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

    this.contentService.addDislike(this.content().id).subscribe({
      next: (updated) => {
        this.dislikes.set(updated.dislikes);
      },
    });
  }

  imageUrl(): string | null {
    const imageUrl = this.content().image_url?.trim();

    return imageUrl || null;
  }

  categoryIcon(): string {
    switch (String(this.subTag().tag_id)) {
      case '1':
        return 'ph-palette';
      case '2':
        return 'ph-fork-knife';
      case '3':
        return 'ph-leaf';
      case '4':
        return 'ph-bank';
      default:
        return 'ph-image';
    }
  }

  formatDate(date: string): string {
    if (!date) return '';

    const parsed = new Date(date.replace(' ', 'T'));

    if (Number.isNaN(parsed.getTime())) return '';

    return parsed.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
}
