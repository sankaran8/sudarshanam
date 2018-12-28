import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private api_key: string = 'e59ee22b6563457b8135b6af86128b5f';

  private api_url: string = 'https://newsapi.org/v2/';

  constructor(private http:HttpClient) { }

  initSources(){
    return this.http.get(this.api_url + 'sources?language=en&apiKey=' + this.api_key);
  }
  initArticles(){
    return this.http.get(this.api_url + 'top-headlines?sources=techcrunch&apiKey=' + this.api_key);
  }
  getArticlesByID(source: String){
   return this.http.get(this.api_url + 'top-headlines?sources=' + source + '&apiKey=' + this.api_key);
  }
}
