import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Posting} from './issue-posting.model';

export const mockPostingData: Posting[] = [{
    id: '2',
    title: 'Sample Issue #2',
    text: ` This is a sample issue. All data are stored in the Local Storage.
     It supports some html tags like <b>bold</b> or navigate to <a href="https://www.google.com">links</a>.
     Because it is an MVP, it does not implement any string sanitation, so it could be prone to certain vulnerabilities.
     Please use with caution.`,
    tags: ['issue']
  },
  {
      id: '`1`',
      title: 'Sample Issue #1',
      text: ' This is a sample issue.',
      tags: ['bug', 'issue', 'comment']
  }
];
@Injectable({
  providedIn: 'root'
})
export class IssuePostingService {
  public postingTags = new Map();
  constructor(
    private http: HttpClient
  ) { }
  public getPostings() {
    // GET request
    // const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    // const url = '/api/postings';
    // return this.http.get(url, {headers: headers});
    return this._getPostings()
  }
  public deletePosting(id) {
    // DELETE request
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // const url = '/api/postings/'+id;
    //return this.http.delete(url, {headers: headers});
    return this._deletePosting(id);

  }
  public addPosting(newPost: Posting) {
    // POST request
    // const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    // const url = '/api/postings/add';
    // return this.http.post(url, JSON.stringify(newPost), {headers:headers});
    if (newPost.id) {
      return this._savePosting(newPost);
    }
    return this._addPosting(newPost);
  }

  // private temporary methods to operate out of local storage
  private _getPostings() {
    if (!localStorage.postingData) {
      localStorage.postingData = JSON.stringify(mockPostingData);
    }
    const postingData = JSON.parse(localStorage.postingData);
    for (let i = 0; i < postingData.length; i++) {
      let tags = postingData[i].tags;
      for (let j = 0; j < tags.length; j++) {
        this.postingTags.set(tags[j].toLowerCase(), '');
      }
    }
    if (this.postingTags.size === 0) {
      this.postingTags.set('issue', '');
      this.postingTags.set('bug', '');
    }
    return of(postingData);
  }
  private _deletePosting(id) {
    const postingData = JSON.parse(localStorage.postingData);
    const afterDeleteData = [];
    for (let i = 0; i < postingData.length; i++) {
      const post = postingData[i];
      if (post.id !== id) {
        afterDeleteData.push(post);
      }
    }
    localStorage.postingData = JSON.stringify(afterDeleteData);
    return of('ok');
  }
  private _addPosting(newPost: Posting) {
    let afterInsertData = [];
    afterInsertData.push(newPost);
    const postingData = JSON.parse(localStorage.postingData);
    let maxID = 0;
    for (let i = 0; i < postingData.length; i++) {
      const posting = postingData[i];
      if (posting.id > maxID) { maxID = posting.id; }
      afterInsertData.push(posting);
    }
    afterInsertData[0].id = maxID + 1;
    localStorage.postingData = JSON.stringify(afterInsertData);
    return of('ok');
  }
  private _savePosting(changedPost: Posting) {
    const postingData = JSON.parse(localStorage.postingData);
    for (let i = 0; i < postingData.length; i++) {
      if (postingData[i].id === changedPost.id) {
        postingData[i] = changedPost;
        break;
      }
    }
   localStorage.postingData = JSON.stringify(postingData);
    return of('ok');
  }



}
