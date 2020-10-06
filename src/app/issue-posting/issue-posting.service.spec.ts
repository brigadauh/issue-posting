import { TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';

import { IssuePostingService } from './issue-posting.service';

describe('IssuePostingService', () => {
  let service: IssuePostingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [ AppModule ]
    });
    service = TestBed.inject(IssuePostingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
