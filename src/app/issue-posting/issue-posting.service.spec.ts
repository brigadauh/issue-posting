import { TestBed } from '@angular/core/testing';

import { IssuePostingService } from './issue-posting.service';

describe('IssuePostingService', () => {
  let service: IssuePostingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssuePostingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
