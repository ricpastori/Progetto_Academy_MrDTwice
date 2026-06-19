import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// Moduli PrimeNG
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { EditorModule } from 'primeng/editor';

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
    CascadeSelectModule,
    EditorModule,
  ],
  providers: [ContentService, ImageUploadService, RegionService, TagService, SubTagService],

  templateUrl: './add-place-form.html',
  styleUrls: ['./add-place-form.css'],
})
export class AddPlaceFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private contentService = inject(ContentService);
  private imageUploadService = inject(ImageUploadService);

  public regionService = inject(RegionService);
  public tagService = inject(TagService);
  public subTagService = inject(SubTagService);

  public placeForm!: FormGroup;
  public isSubmitting = signal<boolean>(false);
  public selectedFile = signal<File | null>(null);
  public imagePreview = signal<string | null>(null);

  public categorieList = [
    { id: 'natura', name: 'Natura' },
    { id: 'storia_monumenti', name: 'Storia & Monumenti' },
    { id: 'arte_cultura', name: 'Arte & Cultura' },
    { id: 'food_wine', name: 'Food & Wine' },
    { id: 'esperienze', name: 'Esperienze' },
    { id: 'vita_locale', name: 'Vita Locale' },
  ];

  ngOnInit(): void {
    this.placeForm = this.fb.group({
      tag_id: [null, Validators.required],
      sub_tag_id: [{ value: null, disabled: true }, Validators.required],
      region_id: [null, Validators.required],
      city: ['', Validators.required],
      place: ['', Validators.required],
      description: ['', Validators.required],
    });

    // Inizializzazione dei dati dai servizi
    this.regionService.getRegions();
    this.tagService.getTags();
  }

  selectCategory(tagId: string): void {
    this.placeForm.patchValue({ tag_id: tagId });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFile.set(file);
      this.imagePreview.set(file.name);
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
        ...this.placeForm.value,
        image_url: publicImageUrl,
      };

      this.contentService.createContent(payload).subscribe({
        next: () => {
          alert('Luogo aggiunto con successo al database!');
          this.placeForm.reset();
          this.selectedFile.set(null);
          this.imagePreview.set(null);
          this.placeForm.get('sub_tag_id')?.disable();
          this.isSubmitting.set(false);
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
