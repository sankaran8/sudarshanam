import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormControl} from '@angular/forms';

import { ImagesService } from '../../services/images.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  private routeSub: any;
  private collectionID: number;
  private photosSub: any;
  private itemsPerPage: number = 20;
  private currentPage: number = 1;
  private pageLoaded = false;
  public noMoreItems = false;
  public currentSort: 'latest' | 'oldest' | 'popular' = 'popular';
  private selection: FormControl;

  public photos: any = [];

  constructor(private route: ActivatedRoute, private images: ImagesService) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.collectionID = params.id;
      this.loadFirstPage();
    });
    this.selection = new FormControl('popular');
    this.currentSort = 'popular';
  }

  loadFirstPage() {
    this.images.getImages(1, 20, this.currentSort)
      .subscribe((data: {}) => {
        this.photos = data;
        this.noMoreItems = true;
      });
  }

  onScroll() {
    this.pageLoaded = false;
    this.currentPage++;
    this.photosSub = this.images.getImages(
      this.currentPage,
      this.itemsPerPage,
      this.currentSort
    ).subscribe(data => {

      Object.keys(data).forEach(photo => {
        this.photos.push(data[photo]);
      });

      // if there's no data show noMoreItems text
      if (data[0] === undefined) {
        this.noMoreItems = true;
      }

      this.pageLoaded = true;
    });
  }

  sort() {
    if (this.currentSort === this.selection['value']) {
      return;
    }

    switch (this.selection['value']) {
      case 'latest':
        this.currentSort = 'latest';
        break;
      case 'oldest':
        this.currentSort = 'oldest';
        break;
      case 'popular':
        this.currentSort = 'popular';
        break;
      default:
        break;
    }
    this.pageLoaded = false;
    this.loadFirstPage();
  }

  ngOnDestroy() {
  }

}
