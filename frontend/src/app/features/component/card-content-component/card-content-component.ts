import { Component, inject, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Content, ContentService } from '../../../services/content-service';
import { SubTag, SubTagService } from '../../../services/sub-tag-service';


@Component({
  selector: 'app-card-content-component',
  imports: [CardModule],
  templateUrl: './card-content-component.html',
  styleUrl: './card-content-component.css',
})
export class CardContentComponent {

  private contentService = inject(ContentService);

   private subTagService = inject(SubTagService);

 content = input.required<Content>();
subTag = input.required<SubTag>();

 addLike() {

    this.contentService
      .addLike(this.content().id);

  }

  addDislike() {

    this.contentService
      .addDislike(this.content().id);

  }



}
