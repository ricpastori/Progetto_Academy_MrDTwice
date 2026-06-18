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

  // Stato pubblico per gestire skeleton, messaggi di errore e lista vuota nella pagina.
  private readonly _loading = signal(false);
  readonly loading = this._loading.asReadonly();

  private readonly _loaded = signal(false);
  readonly loaded = this._loaded.asReadonly();

  private readonly _error = signal<string | null>(null);
  readonly error = this._error.asReadonly();

  getRegions() {
    // Evita chiamate duplicate: dopo il primo caricamento il dato resta nel signal condiviso.
    if (this._loaded() || this._loading()) return;

    this._loading.set(true);
    this._error.set(null);

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
          this._regions.set(Array.isArray(data) ? data : []);
          this._loaded.set(true);
          this._loading.set(false);
        },

        error: (err) => {
          console.error(err);
          this._error.set('Errore nel recupero delle regioni');
          this._loading.set(false);
        },
      });
  }
}
