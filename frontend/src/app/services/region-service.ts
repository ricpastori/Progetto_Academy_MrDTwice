import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export interface Region {
  id: string;
  name: string;
  description: string;
  image: string;
}
@Injectable({
  providedIn: 'root',
})

export class RegionService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/regions';

  regions = signal<Region[]>([]);

  getRegions(){


    this.http
      .get<Region[]>(this.apiUrl)
      .pipe(

        catchError((err) => {

          console.error(
            'Errore recupero regioni',
            err
          );


          return throwError(
            () => new Error(
              'Errore nel recupero delle regioni'
            )
          );

        })

      )
      .subscribe({

        next:(data)=>{

          this.regions.set(data);

        },


        error:(err)=>{

          console.error(err);

        }

      });


  }




}
