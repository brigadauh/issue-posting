import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { IssuePostingService } from './issue-posting.service';
import { Posting } from './issue-posting.model';
@Component({
  selector: 'app-issue-posting',
  templateUrl: './issue-posting.component.html',
  styleUrls: ['./issue-posting.component.scss']
})
export class IssuePostingComponent implements OnInit, OnDestroy {
  public postings: Posting[];
  public postingTags = [];
  public newPost = new Posting();
  public newPostTag = '';
  public addNew = false;
  public currentlyEditingIndex = -1;
  public tagFilter = '';
  private postingSubscription: Subscription;
  @ViewChild('postingForm')
  public postingForm;
  constructor(
    private issuePostingService: IssuePostingService
  ) { }
  ngOnInit(): void {
    this.getPosting();
  }
  ngOnDestroy(): void {
    this.postingSubscription.unsubscribe();
  }
  getPosting() {
    this.postingSubscription = this.issuePostingService.getPostings().subscribe(
      (data: Posting[]) => {
        if (this.tagFilter) {
          this.postings = data
          .filter(post => post.tags && post.tags.length > 0 && post.tags.indexOf(this.tagFilter) !== -1);
        } else {
          this.postings = data;
        }
        this.postingTags = Array.from(this.issuePostingService.postingTags.keys());
        // console.log('data ----->', data, this.postingTags);
      },
      (err: any) => {
        // console.log('Error------->', err);
      }
    );
  }
  deletePosting(id) {
    this.issuePostingService.deletePosting(id).subscribe(
      (ok: any) => {
        this.getPosting();
      },
      (err: any) => {
        // console.log('Error------->', err);
      }
     );
  }
  addPosting() {
    this.addNew = true;
  }
  editPosting(index, posting) {
    this.currentlyEditingIndex = index;
    this.newPost = this.copyPosting(posting);
  }
  savePosting() {
    if (this.postingForm.valid) {
      this.newPost.text = this.expressionParser(this.newPost.text);
      this.issuePostingService.addPosting(this.newPost).subscribe(
        (ok: any) => {
          this.addNew = false;
          this.currentlyEditingIndex = -1;
          this.newPost = new Posting();
          this.getPosting();
        },
        (err: any) => {
          // console.log('Error------->', err);
        }
      );
    }
  }
  cancelPosting() {
    this.addNew = false;
    this.currentlyEditingIndex = -1;
    this.newPost = new Posting();
  }
  addTag() {
    if (this.newPostTag && this.newPost.tags.indexOf(this.newPostTag) === -1) {
      this.newPostTag = this.newPostTag.toLowerCase();
      this.newPost.tags.push(this.newPostTag);
    }
    this.newPostTag = '';
    // console.log('newPostTag', this.newPost);
  }
  removeTag(tag) {
    const afterDeleteData = [];
    for (let i = 0; i < this.newPost.tags.length; i++) {
      const currTag = this.newPost.tags[i];
      if (currTag !== tag) {
        afterDeleteData.push(currTag);
      }
    }
    this.newPost.tags = afterDeleteData;
  }
  setFilter(event) {
    const target = event.target;
    this.tagFilter = target.value.toLowerCase();
    this.getPosting();
  }

  copyPosting(posting:Posting): Posting {
    const newPosting = new Posting();
    newPosting.id = posting.id;
    newPosting.title = posting.title;
    newPosting.text = posting.text;
    const tags = [];
    for ( let i = 0; i < posting.tags.length; i++) {
      tags.push(posting.tags[i]);
    }
    newPosting.tags = tags;
    return newPosting;
  }
  /**
  * Splits a string into an array of expressions.
  * 1) Removes whitespace from left and right of + and -
  * 2) Replaces all non digits except +,-, and "." with spaces.
  * 3) Replace multi-spaces with single space
  * e.g. if given " text 1 + 2 -3 another text 1+2" it will return "1+2-3 1+2"
  * 4) Split into array and calculate sum of each
  * 5) replace each expression with its sum
  */
  public expressionParser(s) {
    if (!s) { return '';}
    s = s.replace(/\s*([\+\-])/g,'$1'); //removing left space near +,-
    s = s.replace(/([\+\-])\s*/g,'$1'); // removing right space near +,-
    let t = s.replace(/[^0-9\+\-\.]/g, " ").replace(/\s\s+/g, ' ').trim(); // removing all non-digits except "+","-","."
    if (!t) {
      return s;
    }
    const expressions = t.split(' '); //splitting space-separated expressions into array
    expressions.map(exp => {
      const sum = this.calculateSum(exp); // calculating sum
      s = s.replace(exp, sum); // replacing an expression with its sum

    });

    return s;
  }
  public calculateSum(s: string) {
    if (!s) {
      return '';
    }
    var total = 0;
    //splitting an expression into an array of positive or negative numbers
    const arr = s.match(/[+\-]*(\.\d+|\d+(\.\d+)?)/g) || [];
    if (arr.length === 1) {
      return s;
    }
    while (arr.length) {
      total += parseFloat(arr.shift()); // adding numbers from the array
    }
    return total + ' (calculated)';
  }

}
