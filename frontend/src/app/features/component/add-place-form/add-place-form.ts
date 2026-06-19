import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// Moduli PrimeNG
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { SelectButtonModule } from 'primeng/selectbutton';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import type { FileSelectEvent } from 'primeng/fileupload';
import { MessageModule } from 'primeng/message';
import { TooltipModule } from 'primeng/tooltip';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

// Servizi
import { ContentService } from '../../../services/content-service';
import { ImageUploadService } from '../../../services/image-upload.service';
import { RegionService } from '../../../services/region-service';
import { TagService } from '../../../services/tag-service';
import { SubTagService } from '../../../services/sub-tag-service';

@Component({
  selector: 'app-add-place-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    Select,
    SelectButtonModule,
    EditorModule,
    FileUploadModule,
    MessageModule,
    TooltipModule,
  ],
  providers: [ContentService, ImageUploadService, RegionService, TagService, SubTagService],
  templateUrl: './add-place-form.html',
  styleUrls: ['./add-place-form.css'],
})
export class AddPlaceFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private contentService = inject(ContentService);
  private imageUploadService = inject(ImageUploadService);

  // Riferimento per chiudere il modale PrimeNG
  private dialogRef = inject(DynamicDialogRef);

  public regionService = inject(RegionService);
  public tagService = inject(TagService);
  public subTagService = inject(SubTagService);

  public placeForm!: FormGroup;
  public isSubmitting = signal<boolean>(false);
  public selectedFile = signal<File | null>(null);
  public imagePreview = signal<string | null>(null);

  // Signal per tracciare la categoria selezionata dall'utente
  public selectedTagId = signal<string | null>(null);

  // SIGNAL COMPUTATO: Filtra automaticamente i sub-tag in base alla categoria selezionata
  public filteredSubTags = computed(() => {
    const tagId = this.selectedTagId();
    if (!tagId) return [];
    return this.subTagService.subTags().filter((sub) => sub.tag_id === tagId);
  });

  ngOnInit(): void {
    this.placeForm = this.fb.group({
      tag_id: [null, Validators.required],
      sub_tag_id: [{ value: null, disabled: true }, Validators.required],
      region_id: [null, Validators.required],
      city: ['', Validators.required],
      place: ['', Validators.required],
      description: ['', Validators.required],
    });

    // Inizializzazione di tutti i dati dai servizi
    this.regionService.getRegions();
    this.tagService.getTags();
    this.subTagService.getSubTags();
  }

  selectCategory(tagId: string): void {
    this.selectedTagId.set(tagId);

    // Aggiorna il form, resetta l'eventuale sotto-categoria precedente e abilita il campo
    this.placeForm.patchValue({ tag_id: tagId, sub_tag_id: null });
    this.placeForm.get('sub_tag_id')?.enable();
  }

  onAnnulla(): void {
    this.dialogRef.close(null); // Chiude il modale senza passare dati
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFile.set(file);
      this.imagePreview.set(file.name);
    }
  }

  onPrimeFileSelected(event: FileSelectEvent): void {
    const file = event.files[0];
    if (file) {
      this.selectedFile.set(file);
      this.imagePreview.set(file.name);
    }
  }

  onPrimeFileRemoved(file: File): void {
    if (this.selectedFile() === file) {
      this.selectedFile.set(null);
      this.imagePreview.set(null);
    }
  }

  triggerFileInput(): void {
    document.getElementById('hiddenFileInput')?.click();
  }

  onFileDropKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.triggerFileInput();
    }
  }

  async onSubmit(): Promise<void> {
    if (this.placeForm.invalid || !this.selectedFile()) {
      alert("La preghiamo di compilare tutti i campi obbligatori e inserire un'immagine.");
      return;
    }

    try {
      this.isSubmitting.set(true);
      const file = this.selectedFile()!;
      const publicImageUrl = await this.imageUploadService.uploadImage(file);

      if (!publicImageUrl) throw new Error('Upload immagine fallito.');

      const payload = {
        ...this.placeForm.getRawValue(),
        image_url: publicImageUrl,
      };

      this.contentService.createContent(payload).subscribe({
        next: (response) => {
          alert('Luogo aggiunto con successo al database!');
          this.isSubmitting.set(false);
          this.dialogRef.close(response);
        },
        error: (err: unknown) => {
          console.error(err);
          alert('Errore di connessione al server backend.');
          this.isSubmitting.set(false);
        },
      });
    } catch (error) {
      console.error(error);
      this.isSubmitting.set(false);
    }
  }
}
