import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface UploadResponse {
  publicUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  private http = inject(HttpClient);
  // Endpoint del vostro backend Express
  private apiUrl = 'http://localhost:8080/api/upload';

  /*Invia l'immagine catturata dal form al backend Express.
   * Ritorna l'URL pubblico restituito dal server.*/
  async uploadImage(file: File): Promise<string | null> {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await firstValueFrom(this.http.post<UploadResponse>(this.apiUrl, formData));

      return response ? response.publicUrl : null;
    } catch (err) {
      console.error("Errore durante l'upload dell'immagine tramite backend:", err);
      return null;
    }
  }
}
