import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, throwError } from 'rxjs';
export interface SubTag{
  id: string,
  tag_id: string,
  name: string

}
@Injectable({
  providedIn: 'root',
})
export class SubTagService {

    private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/sub-tag';

  subTags = signal<SubTag[]>([]);

  getSubTags(tagId: string){


      this.http
      .get<SubTag[]>(
        this.apiUrl,
        {
          params:{
            tag_id: tagId
          }
        }
      )
      .pipe(

        catchError((err)=>{


          console.error(
            'Errore recupero sub tag',
            err
          );


          return throwError(
            ()=> new Error(
              'Errore nel recupero delle sottocategorie'
            )
          );


        })

      )
      .subscribe({

        next:(data)=>{


          this.subTags.set(data);


        },


        error:(err)=>{


          console.error(err);


        }


      });


    }



}
