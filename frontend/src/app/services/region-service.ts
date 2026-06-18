import { Injectable } from '@angular/core';
export interface Region {
  id: string,
  name: string,
  description: string,
  image: string
}
@Injectable({
  providedIn: 'root',
})
export class RegionService {


}
