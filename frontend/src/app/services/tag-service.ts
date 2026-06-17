import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

export interface Tag {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/tags';

  tags = signal<Tag[]>([]);

  getTags() {
    this.http
      .get<Tag[]>(this.apiUrl)
      .pipe(
        catchError((err) => {
          console.error('Errore recupero tag', err);

          return throwError(() => new Error('Errore nel recupero dei tag'));
        }),
      )
      .subscribe({
        next: (data) => {
          this.tags.set(data);
        },

        error: (err) => {
          console.error(err);
        },
      });
  }
}
