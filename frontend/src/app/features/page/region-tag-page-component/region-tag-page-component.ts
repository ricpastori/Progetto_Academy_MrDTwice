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
  content = signal<Content>({
    id: '1',

    region_id: '1',

    tag_id: '2',

    sub_tag_id: '3',

    city: 'Roma',

    place: 'Colosseo',

    image_url: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Colosseo_2020.jpg',

    description: 'Monumento storico di Roma',

    likes: 10,

    dislikes: 2,

    created_at: '2026-06-18',
  });

  subTags = signal<SubTag[]>([
    {
      id: '1',
      tag_id: '1',
      name: 'Musei',
    },

    {
      id: '2',
      tag_id: '1',
      name: 'Monumenti',
    },

    {
      id: '3',
      tag_id: '1',
      name: 'Siti archeologici',
    },

    {
      id: '4',
      tag_id: '1',
      name: 'Chiese e luoghi religiosi',
    },

    {
      id: '5',
      tag_id: '1',
      name: 'Castelli e fortezze',
    },

    {
      id: '6',
      tag_id: '1',
      name: 'Teatri',
    },

    {
      id: '7',
      tag_id: '1',
      name: 'Architettura storica',
    },

    {
      id: '8',
      tag_id: '2',
      name: 'Ristoranti generici',
    },

    {
      id: '9',
      tag_id: '2',
      name: 'Ristoranti locali',
    },

    {
      id: '10',
      tag_id: '2',
      name: 'Fast Food',
    },

    {
      id: '11',
      tag_id: '2',
      name: 'Street Food',
    },

    {
      id: '14',
      tag_id: '3',
      name: 'Mare',
    },

    {
      id: '15',
      tag_id: '3',
      name: 'Montagna',
    },

    {
      id: '22',
      tag_id: '4',
      name: 'Parchi divertimento',
    },

    {
      id: '23',
      tag_id: '4',
      name: 'Zoo e acquari',
    },
  ]);

  getSubTag(content: Content): SubTag {

  return this.subTags()
    .filter(
      subTag =>
        subTag.id === content.sub_tag_id
    )[0];

}
}
