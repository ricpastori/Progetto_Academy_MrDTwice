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

  private apiUrl = 'http://localhost:8080/api';


  async getRegions(): Promise<Region[]> {

    const response = await axios.get(
      `${this.apiUrl}/regions`
    );


    return response.data;

  }



}
