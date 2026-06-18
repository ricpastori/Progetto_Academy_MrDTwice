import { Component, inject, signal, OnInit } from '@angular/core';
import { Content, ContentService } from '../../../services/content-service';
import { CardContentComponent } from '../../component/card-content-component/card-content-component';
import { ActivatedRoute } from '@angular/router';
import { SubTagService } from '../../../services/sub-tag-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-region-tag-page',
  imports: [CardContentComponent, FormsModule],
  templateUrl: './region-tag-page.html',
  styleUrl: './region-tag-page.css',
})
export class RegionTagPage implements OnInit {
  private route = inject(ActivatedRoute);

  private contentService = inject(ContentService);

  private subTagService = inject(SubTagService);

  content = signal<Content[]>([]);

  subTags = this.subTagService.subTags;

  searchText = '';

  selectedCity = '';

  sortType = 'popular';

  selectedSubTags = signal<string[]>([]);

  cities: string[] = [];

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const regionId = params.get('regionId');

      const tagId = params.get('tagId');

      if (!regionId || !tagId) return;

      this.contentService.getContentByRegionAndTag(regionId, tagId).subscribe((data) => {
        this.content.set(data);

        this.loadCities(data);
      });
    });

    this.subTagService.getSubTags();
  }

  getSubTag(tag_id: string) {
    return this.subTags().find((tag) => tag.id === tag_id);
  }

  private loadCities(data: Content[]) {
    this.cities = [...new Set(data.map((item) => item.city))];
  }



  filteredContent = () => {
    let data = [...this.content()];

    // ricerca nome luogo

    if (this.searchText) {
      data = data.filter((item) =>
        item.place.toLowerCase().includes(this.searchText.toLowerCase()),
      );
    }

    // filtro città

    if (this.selectedCity) {
      data = data.filter((item) => item.city === this.selectedCity);
    }

    // filtro sottotag

    if (this.selectedSubTags().length) {
      data = data.filter((item) => this.selectedSubTags().includes(item.sub_tag_id));
    }

    // ordinamento like

    if (this.sortType === 'likes') {
      data.sort((a, b) => b.likes - a.likes);
    }

    // più recenti

    if (this.sortType === 'recent') {
      data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    // popolari

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
