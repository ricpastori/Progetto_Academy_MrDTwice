import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, throwError } from 'rxjs';

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

  private readonly _tags = signal<Tag[]>([]);
  readonly tags = this._tags.asReadonly();

  private loading = false;
  private loaded = false;

  getTags() {
    if (this.loaded || this.loading) return;

    this.loading = true;

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
          this._tags.set(data);
          this.loaded = true;
          this.loading = false;
        },

        error: (err) => {
          console.error(err);
          this.loading = false;
        },
      });
  }
}
