import { Component } from '@angular/core';

import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  newsArticles:Array<any>;
  newsSources:Array<any>;

  constructor(private news:NewsService){
    console.log('app component constructor called');
  }

  ngOnInit() {
    //load articles
    this.news.initArticles().subscribe((data: any) => this.newsArticles = data['articles']);
    //load news sources
    this.news.initSources().subscribe((data: any) => this.newsSources = data['sources']);
  }


  searchArticles(source: any){
    this.news.getArticlesByID(source).subscribe(data => this.newsArticles = data['articles']);
  }
}
