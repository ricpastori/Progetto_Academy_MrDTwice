import { TestBed } from '@angular/core/testing';

import { SubTagService } from './sub-tag-service';

describe('SubTagService', () => {
  let service: SubTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
