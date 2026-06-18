import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Content, ContentService } from '../../../services/content-service';
import { SubTag, SubTagService } from '../../../services/sub-tag-service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-card-content-component',
  imports: [CardModule, NgClass],
  templateUrl: './card-content-component.html',
  styleUrl: './card-content-component.css',
})
export class CardContentComponent implements OnInit {
  private contentService = inject(ContentService);

  private subTagService = inject(SubTagService);

  content = input.required<Content>();
  subTag = input.required<SubTag>();

  //signal locali per ogni card
  likes = signal(0);

  dislikes = signal(0);

  ngOnInit() {
    this.likes.set(this.content().likes);

    this.dislikes.set(this.content().dislikes);
  }

  likeAnimation = signal(false);

dislikeAnimation = signal(false);


addLike() {

  this.likeAnimation.set(true);

  setTimeout(() => {
    this.likeAnimation.set(false);
  }, 300);


  this.contentService
    .addLike(this.content().id)
    .subscribe({

      next: (updatedContent) => {

        this.likes.set(updatedContent.likes);

      }

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

      next: (updatedContent) => {

        this.dislikes.set(updatedContent.dislikes);

      }

    });

}

  formatDate(date: string) {
    if (!date) return '';

    const parsedDate = new Date(date.replace(' ', 'T'));

    return parsedDate.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }


}
