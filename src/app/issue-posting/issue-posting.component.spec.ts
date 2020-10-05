import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuePostingComponent } from './issue-posting.component';

describe('IssuePostingComponent', () => {
  let component: IssuePostingComponent;
  let fixture: ComponentFixture<IssuePostingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssuePostingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuePostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});