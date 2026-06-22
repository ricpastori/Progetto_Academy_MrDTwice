import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { of } from 'rxjs';

import { Content, ContentService } from '../../../services/content-service';
import { ImageUploadService } from '../../../services/image-upload.service';
import { RegionService } from '../../../services/region-service';
import { SubTagService } from '../../../services/sub-tag-service';
import { TagService } from '../../../services/tag-service';
import { AddPlaceFormComponent } from './add-place-form';

describe('AddPlaceForm', () => {
  let component: AddPlaceFormComponent;
  let fixture: ComponentFixture<AddPlaceFormComponent>;
  let router: Router;

  const createdContent: Content = {
    id: 'content-1',
    region_id: 'region-1',
    tag_id: 'tag-1',
    sub_tag_id: 'sub-tag-1',
    city: 'Roma',
    place: 'Colosseo',
    image_url: 'https://example.com/colosseo.webp',
    description: '<p>Descrizione</p>',
    likes: 0,
    dislikes: 0,
    created_at: '2026-06-19 12:00:00',
  };

  const contentService = {
    createContent: vi.fn(() => of(createdContent)),
  };
  const uploadImage = vi.fn<(file: File) => Promise<string | null>>();
  const imageUploadService = {
    uploadImage,
  };
  const dialogRef = {
    close: vi.fn(),
  };

  beforeEach(async () => {
    contentService.createContent.mockClear();
    uploadImage.mockClear();
    uploadImage.mockResolvedValue(createdContent.image_url);
    dialogRef.close.mockClear();

    await TestBed.configureTestingModule({
      imports: [AddPlaceFormComponent],
      providers: [provideRouter([]), { provide: DynamicDialogRef, useValue: dialogRef }],
    })
      .overrideComponent(AddPlaceFormComponent, {
        set: {
          providers: [
            { provide: ContentService, useValue: contentService },
            { provide: ImageUploadService, useValue: imageUploadService },
            { provide: RegionService, useValue: { regions: signal([]), getRegions: vi.fn() } },
            { provide: TagService, useValue: { tags: signal([]), getTags: vi.fn() } },
            { provide: SubTagService, useValue: { subTags: signal([]), getSubTags: vi.fn() } },
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AddPlaceFormComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    await fixture.whenStable();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows success and navigates only after the user requests it', async () => {
    const navigate = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    fillValidForm();

    await component.onSubmit();

    expect(component.submissionState()).toBe('success');
    expect(component.createdContent()).toEqual(createdContent);
    expect(dialogRef.close).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();

    component.viewCreatedContent();

    expect(dialogRef.close).toHaveBeenCalledWith(createdContent);
    expect(navigate).toHaveBeenCalledWith(['/content'], {
      queryParams: { id: createdContent.id },
    });
  });

  it('returns to the completed form after an upload error', async () => {
    uploadImage.mockResolvedValueOnce(null);
    fillValidForm();
    const previousValues = component.placeForm.getRawValue();
    const previousFile = component.selectedFile();

    await component.onSubmit();

    expect(component.submissionState()).toBe('error');

    component.retrySubmission();

    expect(component.submissionState()).toBe('form');
    expect(component.placeForm.getRawValue()).toEqual(previousValues);
    expect(component.selectedFile()).toBe(previousFile);
  });

  it('enforces title and rich-text description limits', () => {
    component.placeForm.patchValue({
      place: 'a'.repeat(component.titleMaxLength + 1),
      description: `<p>${'a'.repeat(component.descriptionMaxLength + 1)}</p>`,
    });

    expect(component.placeForm.get('place')?.hasError('maxlength')).toBe(true);
    expect(component.placeForm.get('description')?.hasError('maxlength')).toBe(true);
  });

  it('provides named alignment controls and an upload name containing the visible label', () => {
    const element = fixture.nativeElement as HTMLElement;
    const alignmentButtons = Array.from(
      element.querySelectorAll<HTMLButtonElement>('button.ql-align'),
    );
    const uploadButton = element.querySelector<HTMLButtonElement>('.upload-dropzone');

    expect(alignmentButtons).toHaveLength(4);
    expect(alignmentButtons.map((button) => button.getAttribute('aria-label'))).toEqual([
      'Allinea a sinistra',
      'Allinea al centro',
      'Allinea a destra',
      'Giustifica',
    ]);
    expect(element.querySelector('.ql-picker')).toBeNull();
    expect(uploadButton?.getAttribute('aria-label')).toContain('Clicca o trascina qui');
  });

  function fillValidForm(): void {
    component.selectCategory('tag-1');
    component.placeForm.setValue({
      tag_id: 'tag-1',
      sub_tag_id: 'sub-tag-1',
      region_id: 'region-1',
      city: 'Roma',
      place: 'Colosseo',
      description: '<p>Descrizione</p>',
    });
    component.selectedFile.set(new File(['image'], 'colosseo.webp', { type: 'image/webp' }));
  }
});
