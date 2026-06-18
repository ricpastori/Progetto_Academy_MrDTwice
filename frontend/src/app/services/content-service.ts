import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
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


  getContent() {
    return this.http.get<Content[]>(this.apiUrl).pipe(
      catchError((err) => {
        console.error(err);
        return throwError(() => new Error('Errore recupero content'));
      })
    );
  }


  getContentByRegion(regionId: string) {

    const params = new HttpParams()
      .set('regionId', regionId);

    return this.http
      .get<Content[]>(this.apiUrl, { params })
      .pipe(
        catchError((err) => {
          console.error(err);
          return throwError(() => new Error('Errore recupero content'));
        })
      );
  }


  getContentByRegionAndTag(regionId: string, tagId: string) {

    const params = new HttpParams()
      .set('regionId', regionId)
      .set('tagId', tagId);

    return this.http
      .get<Content[]>(this.apiUrl, { params })
      .pipe(
        catchError((err) => {
          console.error(err);
          return throwError(() => new Error('Errore recupero content'));
        })
      );
  }


  getLatestContentByRegionByTag(tagId: string) {

    const params = new HttpParams()
      .set('tagId', tagId);

    return this.http
      .get<Content[]>(
        `${this.apiUrl}/by-tag/latest-by-region`,
        { params }
      )
      .pipe(
        catchError((err) => {
          console.error(err);
          return throwError(() => new Error('Errore recupero content'));
        })
      );
  }


  getMostLikedContentByRegionByTag(tagId: string) {

    const params = new HttpParams()
      .set('tagId', tagId);

    return this.http
      .get<Content[]>(
        `${this.apiUrl}/by-tag/top-liked-by-region`,
        { params }
      )
      .pipe(
        catchError((err) => {
          console.error(err);
          return throwError(() => new Error('Errore recupero content'));
        })
      );
  }


  addLike(id: string) {

    const params = new HttpParams()
      .set('id', id);

    return this.http
      .post<Content>(
        `${this.apiUrl}/like`,
        {},
        { params }
      )
      .pipe(
        catchError((err) => {
          console.error(err);
          return throwError(() => new Error('Errore aggiunta like'));
        })
      );
  }


  addDislike(id: string) {

    const params = new HttpParams()
      .set('id', id);

    return this.http
      .post<Content>(
        `${this.apiUrl}/dislike`,
        {},
        { params }
      )
      .pipe(
        catchError((err) => {
          console.error(err);
          return throwError(() => new Error('Errore aggiunta dislike'));
        })
      );
  }


  createContent(payload: Partial<Content>) {

    return this.http
      .post<Content>(this.apiUrl, payload)
      .pipe(
        catchError((err) => {
          console.error(err);
          return throwError(() => new Error('Errore nella creazione del content'));
        })
      );
  }
}
