import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ImagesService } from '../../services/images.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public photos: any = [];

  private noMoreItems = false;

  constructor(private imagessds: ImagesService) { }

  ngOnInit() {
    this.loadFirstPage()
  }

  loadFirstPage() {
    this.imagessds.getImages()
      .subscribe((data: {}) => {
        this.photos = data;
        this.noMoreItems = true;
      });
  }

}
