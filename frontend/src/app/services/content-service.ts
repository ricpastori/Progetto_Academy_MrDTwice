import { Injectable } from '@angular/core';
export interface Content {

			id: string,
			region_id: string,
			tag_id: string,
			sub_tag_id: string,
			city: string,
			place: string,
			image_url: string,
			description: string,
			likes: number,
			dislikes: number,
			created_at: string
}
@Injectable({
  providedIn: 'root',
})
export class ContentService {



  
}
