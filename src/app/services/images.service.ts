import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private api_access_key: string = '2b0de277f8f56271b0a3361bae68d63d2bf5f42583e4a10aa7a7ce4bc39b79bc';

  public api_url: string = 'https://api.unsplash.com/';

  constructor(public http: HttpClient) {
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getImages(page: number = 1, per_page: number = 20, order_by: 'latest' | 'oldest' | 'popular' = 'popular'): Observable<any> {
    return this.http.get(
      this.apiUrl('photos') + `&page=${page}&per_page=${per_page}&order_by=${order_by}`, {
      headers: {
        'Expires': '10000000'
      }
    }).pipe(
      map(this.extractData)
    );
  }

  getImages2(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<any> {
    const images = new Subject<Array<any>>();
    this.http.get(this.apiUrl('photos'))
      .subscribe((image: any) => {
        images.next(image.list);
      });
    return images;
  }

  apiUrl(item: string): string {
    return `https://api.unsplash.com/${item}/?client_id=${this.api_access_key}`;
  }
}
