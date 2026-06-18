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

  private readonly _regions = signal<Region[]>([]);
  readonly regions = this._regions.asReadonly();

  private loading = false;
  private loaded = false;

  getRegions() {
    if (this.loaded || this.loading) return;

    this.loading = true;

    this.http
      .get<Region[]>(this.apiUrl)
      .pipe(
        catchError((err) => {
          console.error('Errore recupero regioni', err);

          return throwError(() => new Error('Errore nel recupero delle regioni'));
        }),
      )
      .subscribe({
        next: (data) => {
          this._regions.set(data);
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
