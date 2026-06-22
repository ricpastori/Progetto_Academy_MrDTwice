import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { Content, ContentService } from '../../../services/content-service';
import { SubTag } from '../../../services/sub-tag-service';
import { CardContentComponent } from './card-content-component';

describe('CardContentComponent', () => {
  let component: CardContentComponent;
  let fixture: ComponentFixture<CardContentComponent>;

  const content: Content = {
    id: 'content-1',
    region_id: 'region-1',
    tag_id: 'tag-1',
    sub_tag_id: 'sub-tag-1',
    city: 'Roma',
    place: 'Colosseo',
    image_url: '',
    description: '<p>Una descrizione con <a href="https://example.com">un link</a>.</p>',
    likes: 2,
    dislikes: 1,
    created_at: '2026-06-19 12:00:00',
  };
  const subTag: SubTag = { id: 'sub-tag-1', tag_id: 'tag-1', name: 'Monumenti' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardContentComponent],
      providers: [
        provideRouter([]),
        {
          provide: ContentService,
          useValue: {
            addLike: vi.fn(() => of({ ...content, likes: 3 })),
            addDislike: vi.fn(() => of({ ...content, dislikes: 2 })),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CardContentComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('content', content);
    fixture.componentRef.setInput('subTag', subTag);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the rich description as a non-interactive plain-text preview', () => {
    const preview = fixture.nativeElement.querySelector('.description') as HTMLElement;

    expect(preview.textContent?.trim()).toBe('Una descrizione con un link.');
    expect(preview.querySelector('a')).toBeNull();
  });
});
