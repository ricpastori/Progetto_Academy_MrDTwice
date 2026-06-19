import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, of, throwError } from 'rxjs';

export interface Region {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface RegionContentsCount {
  id: string;
  count: number;
}

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/region';

  private readonly _regions = signal<Region[]>([]);
  readonly regions = this._regions.asReadonly();

  // Stato pubblico per gestire skeleton, messaggi di errore e lista vuota nella pagina.
  private readonly _loading = signal(false);
  readonly loading = this._loading.asReadonly();

  private readonly _loaded = signal(false);
  readonly loaded = this._loaded.asReadonly();

  private readonly _error = signal<string | null>(null);
  readonly error = this._error.asReadonly();

  // Stato separato per i conteggi: la lista regioni e i count arrivano da API diverse.
  private readonly _regionsContentsCount = signal<RegionContentsCount[]>([]);
  readonly regionsContentsCount = this._regionsContentsCount.asReadonly();

  private readonly _contentsCountLoading = signal(false);
  readonly contentsCountLoading = this._contentsCountLoading.asReadonly();

  private readonly _contentsCountLoaded = signal(false);
  readonly contentsCountLoaded = this._contentsCountLoaded.asReadonly();

  private readonly _contentsCountError = signal<string | null>(null);
  readonly contentsCountError = this._contentsCountError.asReadonly();

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

  getRegionsContentsCount() {
    // Evita chiamate duplicate anche per il conteggio dei contenuti.
    if (this._contentsCountLoaded() || this._contentsCountLoading()) return;

    this._contentsCountLoading.set(true);
    this._contentsCountError.set(null);

    this.http
      .get<RegionContentsCount[]>(`${this.apiUrl}/contents-count`)
      .pipe(
        catchError((err) => {
          console.error('Errore recupero conteggio contenuti regioni', err);
          this._contentsCountError.set('Errore nel recupero del conteggio dei contenuti');

          // Se il conteggio non arriva, le card mostreranno 0 invece di rompere la pagina.
          return of([]);
        }),
      )
      .subscribe({
        next: (data) => {
          this._regionsContentsCount.set(Array.isArray(data) ? data : []);
          this._contentsCountLoaded.set(true);
          this._contentsCountLoading.set(false);
        },
      });
  }

  getRegionContentsCount(regionId: string): number {
    return this._regionsContentsCount().find((item) => item.id === regionId)?.count ?? 0;
  }
}
