import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';

import { Content, ContentService } from '../../../services/content-service';
import { RegionService } from '../../../services/region-service';
import { SubTagService } from '../../../services/sub-tag-service';
import { TagService } from '../../../services/tag-service';
import { ContentDetails } from './content-details';

describe('ContentDetails', () => {
  let component: ContentDetails;
  let fixture: ComponentFixture<ContentDetails>;
  let title: Title;

  const content: Content = {
    id: 'content-1',
    region_id: 'region-1',
    tag_id: 'tag-1',
    sub_tag_id: 'sub-tag-1',
    city: 'Roma',
    place: 'Colosseo',
    image_url: '',
    description: '<p>Descrizione</p>',
    likes: 2,
    dislikes: 1,
    created_at: '2026-06-19 12:00:00',
  };
  const addLike = vi.fn(() => of({ ...content, likes: 3 }));
  const addDislike = vi.fn(() => of({ ...content, dislikes: 2 }));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentDetails],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { queryParamMap: of(convertToParamMap({ id: content.id })) },
        },
        {
          provide: ContentService,
          useValue: {
            getContentById: vi.fn(() => of(content)),
            addLike,
            addDislike,
          },
        },
        {
          provide: RegionService,
          useValue: { regions: signal([]), getRegions: vi.fn() },
        },
        { provide: TagService, useValue: { tags: signal([]), getTags: vi.fn() } },
        {
          provide: SubTagService,
          useValue: { subTags: signal([]), getSubTags: vi.fn() },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentDetails);
    component = fixture.componentInstance;
    title = TestBed.inject(Title);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('uses the place name as document title', () => {
    expect(title.getTitle()).toBe('Colosseo | Mr D Twice');
  });

  it('announces reaction updates and exposes the current totals', () => {
    component.addLike();
    component.addDislike();
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const buttons = Array.from(
      element.querySelectorAll<HTMLButtonElement>('.content-details__reaction'),
    );
    const status = element.querySelector('[role="status"]') as HTMLElement;

    expect(buttons[0].getAttribute('aria-label')).toBe('Mi piace. Totale: 3');
    expect(buttons[1].getAttribute('aria-label')).toBe('Non mi piace. Totale: 2');
    expect(status.textContent).toContain('Totale non mi piace: 2');
  });

  it('announces a reaction error', () => {
    addLike.mockReturnValueOnce(throwError(() => new Error('Errore')));

    component.addLike();

    expect(component.reactionAnnouncement()).toContain('Non è stato possibile');
  });
});
