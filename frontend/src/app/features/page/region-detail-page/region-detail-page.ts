import { Component, computed, inject, OnInit, signal } from '@angular/core';
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
  imports: [
    CardRegion,
    CardContentComponent
  ],
  templateUrl: './region-detail-page.html',
  styleUrls: ['./region-detail-page.css'],
})
export class RegionDetailPage implements OnInit {


  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private regionService = inject(RegionService);

  private tagService = inject(TagService);

  private contentService = inject(ContentService);

  private subTagService = inject(SubTagService);



  tags = this.tagService.tags;

  subTags = this.subTagService.subTags;



  selectedRegionId = signal<string>('');


  currentRegion = signal<Region | null>(null);


  regionContents = signal<Content[]>([]);


  isLoading = signal<boolean>(true);



  contentsByCategory = computed(() => {


    const contents = this.regionContents();

    const subs = this.subTags();



    const map = new Map<string, Content[]>();


    contents.forEach(content => {


      const sub = subs.find(
        s => s.id === content.sub_tag_id
      );


      if (!sub) return;



      if (!map.has(sub.tag_id)) {

        map.set(sub.tag_id, []);

      }


      map.get(sub.tag_id)!.push(content);


    });


    return map;

  });



  ngOnInit() {


    this.tagService.getTags();

    this.subTagService.getSubTags();


    this.route.queryParamMap.subscribe(params => {


      const regionId = params.get('regionId');


      if (!regionId) {

        this.isLoading.set(false);

        return;

      }


      this.selectedRegionId.set(regionId);



      this.isLoading.set(true);



      this.regionService.getRegions();



      const region = this.regionService
        .regions()
        .find(r => String(r.id) === regionId);



      if(region){

        this.currentRegion.set(region);

      }



      this.contentService
        .getContentByRegion(regionId)
        .subscribe(contents => {


          this.regionContents.set(contents);


          if(!this.currentRegion()){


            const found =
              this.regionService
                .regions()
                .find(r => String(r.id) === regionId);



            this.currentRegion.set(found ?? null);

          }


          this.isLoading.set(false);


        });


    });


  }



  getContentsForTag(tagId:string){


    return this.contentsByCategory()
      .get(tagId) ?? [];


  }



  getSubTagById(id:string){


    return this.subTags()
      .find(sub => sub.id === id)
      ?? {
        id:'',
        name:'',
        tag_id:''
      };


  }



  onTagClick(tagId:string){


    this.router.navigate(
      ['/regioni/regione-dettaglio/regione-tags'],
      {
        queryParams:{
          regionId:this.selectedRegionId(),
          tagId
        }
      }
    );


  }


}
