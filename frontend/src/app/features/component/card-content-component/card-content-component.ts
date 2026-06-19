import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ContentService, Content } from '../../../services/content-service';
import { SubTag } from '../../../services/sub-tag-service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-card-content-component',
  imports: [CardModule, NgClass],
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

  ngOnInit() {

    this.likes.set(this.content().likes ?? 0);

    this.dislikes.set(this.content().dislikes ?? 0);
  }

  addLike() {
    this.likeAnimation.set(true);

    setTimeout(() => {
      this.likeAnimation.set(false);
    }, 300);

    this.contentService
      .addLike(this.content().id)

      .subscribe({
        next: (updated) => {
          this.likes.set(updated.likes);
        },
      });
  }

  addDislike() {
    this.dislikeAnimation.set(true);

    setTimeout(() => {
      this.dislikeAnimation.set(false);
    }, 300);

    this.contentService
      .addDislike(this.content().id)

      .subscribe({
        next: (updated) => {
          this.dislikes.set(updated.dislikes);
        },
      });
  }

  formatDate(date: string) {
    if (!date) return '';

    const parsed = new Date(date.replace(' ', 'T'));

    return parsed.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
}
