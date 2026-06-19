import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegionService, Region } from '../../../services/region-service';
import { TagService } from '../../../services/tag-service';
import { ContentService, Content } from '../../../services/content-service';
import { SubTagService } from '../../../services/sub-tag-service';
import { CardRegion } from '../../component/card-region/card-region';
import { CardContentComponent } from '../../component/card-content-component/card-content-component';

@Component({
  selector: 'app-region-detail-page',
  standalone: true,
  imports: [CardRegion, CardContentComponent],
  templateUrl: './region-detail-page.html',
  styleUrl: './region-detail-page.css',
})
export class RegionDetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private regionService = inject(RegionService);
  private tagService = inject(TagService);
  private contentService = inject(ContentService);
  private subTagService = inject(SubTagService);

  // Store dei dizionari globali (presi dai servizi come nella tua pagina)
  tags = this.tagService.tags;
  subTags = this.subTagService.subTags;

  // Signal locali per lo stato specifico della pagina
  selectedRegionId = '';
  currentRegion = signal<Region | null>(null);
  regionContents = signal<Content[]>([]);
  isLoading = signal(true);

  // Computed per raggruppare i contenuti per macro-tag (le 4 categorie)
  private readonly contentsByCategory = computed(() => {
    const contents = this.regionContents();
    const subs = this.subTags();

    // Creiamo una mappa temporanea di corrispondenze sub_tag_id -> tag_id
    const subToTagMap = new Map<string, string>();
    subs.forEach((sub) => subToTagMap.set(sub.id, sub.tag_id));

    const grouped = new Map<string, Content[]>();
    contents.forEach((item) => {
      const parentTagId = subToTagMap.get(item.sub_tag_id);
      if (parentTagId) {
        if (!grouped.has(parentTagId)) grouped.set(parentTagId, []);
        grouped.get(parentTagId)!.push(item);
      }
    });

    return grouped;
  });

  ngOnInit() {
    // 1. Carichiamo i dizionari asincroni di contorno
    this.tagService.getTags();
    this.subTagService.getSubTags();

    // 2. Prendiamo spunto dalla tua gestione dei parametri della route
    this.route.queryParamMap.subscribe((params) => {
      const regionId = params.get('regionId');
      if (!regionId) return;

      this.selectedRegionId = regionId;
      this.isLoading.set(true);

      // Carichiamo i contenuti della regione
      this.contentService.getContentByRegion(regionId).subscribe((contentData) => {
        this.regionContents.set(contentData);
      });

      // Recuperiamo la singola regione direttamente dal backend o dallo store centralizzato
      // Se il tuo regionService non ha "getRegionById", assicurati che la lista sia popolata
      this.regionService.getRegions();

      // Monitoriamo l'effettivo caricamento della lista regioni per estrarre quella corretta
      const checkRegionInterval = setInterval(() => {
        const found = this.regionService.regions().find(
          (r) => String(r.id) === String(regionId)
        );
        if (found || !this.regionService.loading()) {
          this.currentRegion.set(found || null);
          this.isLoading.set(false);
          clearInterval(checkRegionInterval);
        }
      }, 50);
    });
  }

  getContentsForTag(tagId: string): Content[] {
    return this.contentsByCategory().get(tagId) || [];
  }

  getSubTagById(subTagId: string) {
    return this.subTags().find((sub) => sub.id === subTagId)!;
  }

  onTagClick(tagId: string) {
    this.router.navigate(['/region-tag'], {
      queryParams: {
        regionId: this.selectedRegionId,
        tagId: tagId,
      },
    });
  }
}
