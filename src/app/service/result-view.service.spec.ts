import { TestBed } from '@angular/core/testing';

import { ResultViewService } from './result-view.service';

describe('ResultViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResultViewService = TestBed.get(ResultViewService);
    expect(service).toBeTruthy();
  });
});
