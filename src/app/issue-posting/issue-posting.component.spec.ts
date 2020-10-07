import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';
import { IssuePostingComponent } from './issue-posting.component';

describe('IssuePostingComponent', () => {
  let component: IssuePostingComponent;
  let fixture: ComponentFixture<IssuePostingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssuePostingComponent ],
      imports: [ AppModule ]
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
  it('should calculate string expressions', () => {
    const exp1 = '1+2+3';
    const answer1 = '6 (calculated)';
    expect (component.calculateSum(exp1)).toEqual(answer1);
    const exp2 = '1+2-3';
    const answer2 = '0 (calculated)';
    expect (component.calculateSum(exp2)).toEqual(answer2);
    const exp3 = '7';
    const answer3 = '7';
    expect (component.calculateSum(exp3)).toEqual(answer3);
  });
  it ('should parse strings for expressions and return them as array', () => {
    const str1 = 'String with expressions 1+2+3, 1 + 2 - 3 and with just 7 (number)';
    const answer1 = 'String with expressions 6 (calculated), 0 (calculated) and with just 7 (number)';
    expect (component.expressionParser(str1)).toEqual(answer1);
  });

});
