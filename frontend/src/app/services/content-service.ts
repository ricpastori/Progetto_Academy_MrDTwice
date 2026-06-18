import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, throwError } from 'rxjs';
export interface Content {
  id: string;
  region_id: string;
  tag_id: string;
  sub_tag_id: string;
  city: string;
  place: string;
  image_url: string;
  description: string;
  likes: number;
  dislikes: number;
  created_at: string;
}
@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/content';

  contents = signal<Content[]>([]);

  contentsByRegion = signal<Content[]>([]);

  contentsByRegionAndTag = signal<Content[]>([]);

  latestContentByRegionByTag = signal<Content[]>([]);
  mostLikedContentByRegionByTag = signal<Content[]>([]);

  getContent() {
    this.http
      .get<Content[]>(this.apiUrl)
      .pipe(
        catchError((err) => {
          console.error(err);

          return throwError(() => new Error('Errore recupero content'));
        }),
      )
      .subscribe({
        next: (data) => {
          this.contents.set(data);
        },
      });
  }

  getContentByRegion(regionId: string) {
    const params = new HttpParams().set('regionId', regionId);

    this.http
      .get<Content[]>(this.apiUrl, { params })
      .pipe(
        catchError((err) => {
          console.error(err);

          return throwError(() => new Error('Errore recupero content'));
        }),
      )
      .subscribe({
        next: (data) => {
          this.contentsByRegion.set(data);
        },
      });
  }

  getContentByRegionAndTag(regionId: string, tagId: string) {
    const params = new HttpParams().set('regionId', regionId).set('tagId', tagId);

    this.http
      .get<Content[]>(this.apiUrl, { params })
      .pipe(
        catchError((err) => {
          console.error(err);

          return throwError(() => new Error('Errore recupero content'));
        }),
      )
      .subscribe({
        next: (data) => {
          this.contentsByRegionAndTag.set(data);
        },
      });
  }

  getLatestContentByRegionByTag(tagId: string) {
    const params = new HttpParams().set('tagId', tagId);

    this.http
      .get<Content[]>(`${this.apiUrl}/by-tag/latest-by-region`, { params })
      .pipe(
        catchError((err) => {
          console.error(err);

          return throwError(() => new Error('Errore recupero content'));
        }),
      )
      .subscribe({
        next: (data) => {
          this.contentsByRegion.set(data);
        },
      });
  }

  getMostLikedContentByRegionByTag(tagId: string) {
    const params = new HttpParams().set('tagId', tagId);

    this.http
      .get<Content[]>(`${this.apiUrl}/by-tag/top-liked-by-region`, { params })
      .pipe(
        catchError((err) => {
          console.error(err);

          return throwError(() => new Error('Errore recupero content'));
        }),
      )
      .subscribe({
        next: (data) => {
          this.contentsByRegion.set(data);
        },
      });
  }

  addLike(id: string) {
    const params = new HttpParams().set('id', id);

    this.http
      .post<Content>(`${this.apiUrl}/like`, {}, { params })
      .pipe(
        catchError((err) => {
          console.error(err);

          return throwError(() => new Error('Errore aggiunta like'));
        }),
      )
      .subscribe({
        next: (data) => {
          console.log('Content aggiornato', data);
        },
      });
  }

  addDislike(id: string) {
    const params = new HttpParams().set('id', id);

    this.http
      .post<Content>(`${this.apiUrl}/dislike`, {}, { params })
      .pipe(
        catchError((err) => {
          console.error(err);

          return throwError(() => new Error('Errore aggiunta dislike'));
        }),
      )
      .subscribe({
        next: (data) => {
          console.log('Content aggiornato', data);
        },
      });
  }
}
