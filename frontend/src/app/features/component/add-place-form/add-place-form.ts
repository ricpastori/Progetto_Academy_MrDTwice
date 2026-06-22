import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

// Moduli PrimeNG
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { SelectButtonModule } from 'primeng/selectbutton';
import { EditorModule } from 'primeng/editor';
import type { EditorInitEvent, EditorTextChangeEvent } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import type { FileSelectEvent } from 'primeng/fileupload';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { firstValueFrom } from 'rxjs';

// Servizi
import { Content, ContentService } from '../../../services/content-service';
import { ImageUploadService } from '../../../services/image-upload.service';
import { RegionService } from '../../../services/region-service';
import { TagService } from '../../../services/tag-service';
import { SubTagService } from '../../../services/sub-tag-service';

type SubmissionState = 'form' | 'submitting' | 'success' | 'error';

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
    ProgressSpinnerModule,
    TooltipModule,
  ],
  providers: [ContentService, ImageUploadService, RegionService, TagService, SubTagService],
  templateUrl: './add-place-form.html',
  styleUrls: ['./add-place-form.css'],
})
export class AddPlaceFormComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private contentService = inject(ContentService);
  private imageUploadService = inject(ImageUploadService);
  private router = inject(Router);

  // Riferimento per chiudere il modale PrimeNG
  private dialogRef = inject(DynamicDialogRef);

  public regionService = inject(RegionService);
  public tagService = inject(TagService);
  public subTagService = inject(SubTagService);

  public placeForm!: FormGroup;
  public submissionState = signal<SubmissionState>('form');
  public submissionError = signal('');
  public isSubmitting = computed(() => this.submissionState() === 'submitting');
  public createdContent = signal<Content | null>(null);
  public descriptionLength = signal(0);
  public selectedFile = signal<File | null>(null);
  public imagePreview = signal<string | null>(null);

  public readonly titleMaxLength = 120;
  public readonly descriptionMaxLength = 4000;
  public readonly maxImageFileSize = 5_000_000;

  private uploadedFile: File | null = null;
  private uploadedImageUrl: string | null = null;
  private editorRoot: HTMLElement | null = null;
  private destroyed = false;

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
      place: ['', [Validators.required, Validators.maxLength(this.titleMaxLength)]],
      description: ['', [Validators.required, richTextMaxLength(this.descriptionMaxLength)]],
    });

    // Inizializzazione di tutti i dati dai servizi
    this.regionService.getRegions();
    this.tagService.getTags();
    this.subTagService.getSubTags();
  }

  ngOnDestroy(): void {
    this.destroyed = true;
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
      if (this.uploadedFile !== file) {
        this.uploadedFile = null;
        this.uploadedImageUrl = null;
      }

      this.selectedFile.set(file);
      this.imagePreview.set(file.name);
    }
  }

  onPrimeFileRemoved(file: File): void {
    if (this.selectedFile() === file) {
      this.selectedFile.set(null);
      this.imagePreview.set(null);
      this.uploadedFile = null;
      this.uploadedImageUrl = null;
    }
  }

  retrySubmission(): void {
    this.submissionError.set('');
    this.submissionState.set('form');
  }

  viewCreatedContent(): void {
    const content = this.createdContent();

    if (!content) return;

    this.dialogRef.close(content);
    void this.router.navigate(['/content'], { queryParams: { id: content.id } });
  }

  onDescriptionTextChange(event: EditorTextChangeEvent): void {
    this.descriptionLength.set(event.textValue.length);
    queueMicrotask(() => this.syncEditorAccessibility());
  }

  onEditorInit(event: EditorInitEvent): void {
    this.editorRoot = event.editor.root as HTMLElement;
    this.syncEditorAccessibility();
  }

  onEditorBlur(): void {
    queueMicrotask(() => this.syncEditorAccessibility());
  }

  isFieldInvalid(controlName: string): boolean {
    const control = this.placeForm?.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
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
    if (this.isSubmitting()) return;

    if (this.placeForm.invalid || !this.selectedFile()) {
      alert("La preghiamo di compilare tutti i campi obbligatori e inserire un'immagine.");
      return;
    }

    this.submissionError.set('');
    this.createdContent.set(null);
    this.submissionState.set('submitting');

    try {
      const file = this.selectedFile()!;
      let publicImageUrl = this.uploadedFile === file ? this.uploadedImageUrl : null;

      if (!publicImageUrl) {
        publicImageUrl = await this.imageUploadService.uploadImage(file);

        if (this.destroyed) return;

        if (publicImageUrl) {
          this.uploadedFile = file;
          this.uploadedImageUrl = publicImageUrl;
        }
      }

      if (!publicImageUrl) {
        throw new Error('Non siamo riusciti a caricare l’immagine. Controlla la connessione.');
      }

      const payload = {
        ...this.placeForm.getRawValue(),
        image_url: publicImageUrl,
      };

      const createdContent = await firstValueFrom(this.contentService.createContent(payload));

      if (this.destroyed) return;

      this.submissionState.set('success');
      this.createdContent.set(createdContent);
    } catch (error) {
      if (this.destroyed) return;

      console.error(error);
      this.submissionError.set(
        error instanceof Error && error.message.startsWith('Non siamo riusciti')
          ? error.message
          : 'Non siamo riusciti ad aggiungere il luogo. Controlla la connessione e riprova.',
      );
      this.submissionState.set('error');
    }
  }

  private syncEditorAccessibility(): void {
    if (!this.editorRoot) return;

    this.editorRoot.id = 'descriptionId';
    this.editorRoot.setAttribute('role', 'textbox');
    this.editorRoot.setAttribute('aria-multiline', 'true');
    this.editorRoot.setAttribute('aria-labelledby', 'descriptionLabel');
    this.editorRoot.setAttribute('aria-describedby', 'descriptionCounter descriptionError');
    this.editorRoot.setAttribute('aria-required', 'true');
    this.editorRoot.setAttribute(
      'aria-invalid',
      this.isFieldInvalid('description') ? 'true' : 'false',
    );
  }
}

function richTextMaxLength(maxLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const actualLength = getRichTextLength(control.value);

    return actualLength > maxLength
      ? { maxlength: { requiredLength: maxLength, actualLength } }
      : null;
  };
}

function getRichTextLength(value: unknown): number {
  if (typeof value !== 'string') return 0;

  return value
    .replace(/<[^>]*>/g, '')
    .replace(/&[^;]+;/g, ' ')
    .trim().length;
}
