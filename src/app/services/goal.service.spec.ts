import { TestBed } from '@angular/core/testing';

import { goalService } from './goal.service';

describe('goalService', () => {
  let service: goalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(goalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
