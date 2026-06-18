import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, throwError } from 'rxjs';
export interface SubTag {
  id: string;
  tag_id: string;
  name: string;
}
@Injectable({
  providedIn: 'root',
})
export class SubTagService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/sub-tags';

  private readonly _subTags = signal<SubTag[]>([]);
  readonly subTags = this._subTags.asReadonly();

  private loading = false;
  private loaded = false;

  getSubTags() {
    if (this.loaded || this.loading) return;

    this.loading = true;

    this.http
      .get<SubTag[]>(this.apiUrl)
      .pipe(
        catchError((err) => {
          console.error('Errore recupero sub tag', err);

          return throwError(() => new Error('Errore nel recupero delle sottocategorie'));
        }),
      )
      .subscribe({
        next: (data) => {
          this._subTags.set(data);
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
