import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  private supabase: SupabaseClient;

  constructor() {
    // Inserire le vere credenziali del progetto Supabase
    const supabaseUrl = 'https://glmljicqclsxyiqkbxqb.supabase.co';
    const supabaseKey = 'sb_publishable_EmpKKlU__k2OatF_VT8nIg_kZjCzIuB';
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  /* Genera un UUID, rinomina il file e lo carica su Supabase Storage.
   * Ritorna l'URL pubblico dell'immagine.
   */
  async uploadImage(file: File): Promise<string | null> {
    try {
      // Estrazione dell'estensione originale (es. 'jpg', 'png')
      const fileExt = file.name.split('.').pop();

      // Generazione dell'UUID per evitare sovrascritture e definizione del percorso
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `places/${fileName}`;

      // Upload del file nel bucket 'mrdtwice-images'
      const { error } = await this.supabase.storage.from('mrdtwice-images').upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

      if (error) {
        console.error("Errore durante l'upload su Supabase:", error.message);
        return null;
      }

      // Recupero dell'URL pubblico per il salvataggio nel database
      const { data: publicUrlData } = this.supabase.storage
        .from('mrdtwice-images')
        .getPublicUrl(filePath);

      return publicUrlData.publicUrl;
    } catch (err) {
      console.error("Errore imprevisto durante l'upload:", err);
      return null;
    }
  }
}
