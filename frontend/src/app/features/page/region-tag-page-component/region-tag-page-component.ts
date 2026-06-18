import { Component, signal } from '@angular/core';
import { Content } from '../../../services/content-service';
import { CardContentComponent } from '../../component/card-content-component/card-content-component';
import { SubTag } from '../../../services/sub-tag-service';

@Component({
  selector: 'app-region-tag-page-component',
  imports: [CardContentComponent],
  templateUrl: './region-tag-page-component.html',
  styleUrl: './region-tag-page-component.css',
})
export class RegionTagPageComponent {
  /*
  content = signal<Content>();

  subTags = signal<SubTag[]>();

  getSubTag(content: Content): SubTag {

  return this.subTags()
    .filter(
      subTag =>
        subTag.id === content.sub_tag_id
    )[0];

}
    */
}
