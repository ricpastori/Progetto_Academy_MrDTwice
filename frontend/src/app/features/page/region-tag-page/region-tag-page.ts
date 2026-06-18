import { Component, inject, signal } from '@angular/core';
import { Content, ContentService } from '../../../services/content-service';
import { CardContentComponent } from '../../component/card-content-component/card-content-component';
import { ActivatedRoute } from '@angular/router';
import { SubTagService } from '../../../services/sub-tag-service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-region-tag-page',
  imports: [CardContentComponent, FormsModule ],
  templateUrl: './region-tag-page.html',
  styleUrl: './region-tag-page.css',
})
export class RegionTagPage {
  private route = inject(ActivatedRoute);

  // API content
  private contentService = inject(ContentService);

  // API sub tags
  private subTagService = inject(SubTagService);

  /*
    MOCK CONTENT

    Simula:

    GET /content?region_id=7

    Lazio:
    - Colosseo
    - Musei Vaticani
    - Tonnarello
  */
  testContent: Content[] = [
    {
      id: '1',
      region_id: '7',
      tag_id: '1',
      sub_tag_id: '2',
      city: 'Roma',
      place: 'Colosseo',
      image_url: '',
      description: 'Anfiteatro simbolo della città di Roma',
      likes: 120,
      dislikes: 5,
      created_at: '2026-06-17',
    },
    {
      id: '2',
      region_id: '7',
      tag_id: '1',
      sub_tag_id: '1',
      city: 'Roma',
      place: 'Musei Vaticani',
      image_url: '',
      description: 'Collezione artistica di fama mondiale',
      likes: 210,
      dislikes: 8,
      created_at: '2026-06-17',
    },
    {
      id: '3',
      region_id: '7',
      tag_id: '2',
      sub_tag_id: '9',
      city: 'Roma',
      place: 'Tonnarello',
      image_url: '',
      description: 'Ristorante tipico romano',
      likes: 95,
      dislikes: 3,
      created_at: '2026-06-17',
    },
  ];

  /*
    MOCK SUB TAGS

    Simula:

    GET /sub_tags
  */
  testSubTags = [
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
      id: '9',
      tag_id: '2',
      name: 'Ristoranti locali',
    },
  ];

  searchText = '';

  selectedCity = '';

  sortType = 'popular';

  selectedSubTags = signal<string[]>([]);

  cities = ['Roma'];

  selectedRegionName = 'Lazio';

  selectedTagName = 'Storia e Monumenti';

  /*
    Usa dati fake

    Quando colleghi API lascia:

    signal<Content[]>([])
  */
  content = signal<Content[]>(this.testContent);

  /*
    Al posto di:

    this.subTagService.subTags

    uso mock
  */
  subTags = signal(this.testSubTags);

  /*ngOnInit() {



    /*
      API REALE

      URL:

      /regione?regionId=7


      Recupera contenuti filtrati per regione

    */

  /*
    this.route.queryParamMap.subscribe((params) => {

      const regionId = params.get('regionId');


      if (regionId) {

        this.contentService
          .getContentByRegion(regionId)
          .subscribe((data) => {

            this.content.set(data);

          });

      }

    });
    */

  /*
      API REALE

      Recupera tutti i sottotag:

      Musei
      Monumenti
      Mare
      Montagna

    */

  /*
    this.subTagService.getSubTags();

   } */

  /*
    Cerca il sottotag dal suo id

    Esempio:

    sub_tag_id = 2

    ritorna:

    Monumenti
  */

  getSubTag(id: string) {

  return this.subTags()
    .find(tag => tag.id === id)!;

}

  filteredContent = () => {
    let data = [...this.content()];

    // ricerca testo

    if (this.searchText) {
      data = data.filter((item) =>
        item.place.toLowerCase().includes(this.searchText.toLowerCase()),
      );
    }

    // filtro città

    if (this.selectedCity) {
      data = data.filter((item) => item.city === this.selectedCity);
    }

    // filtro sottocategorie

    if (this.selectedSubTags().length) {
      data = data.filter((item) => this.selectedSubTags().includes(item.sub_tag_id));
    }

    // ordinamento

    if (this.sortType === 'likes') {
      data.sort((a, b) => b.likes - a.likes);
    }

    if (this.sortType === 'recent') {
      data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    if (this.sortType === 'popular') {
      data.sort((a, b) => b.likes - b.dislikes - (a.likes - a.dislikes));
    }

    return data;
  };

  toggleSubTag(id: string) {
    const current = this.selectedSubTags();

    if (current.includes(id)) {
      this.selectedSubTags.set(current.filter((x) => x !== id));
    } else {
      this.selectedSubTags.set([...current, id]);
    }
  }
}
