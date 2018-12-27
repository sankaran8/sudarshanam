import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  api_key = 'cc72d2dea6c09349d24549dbcdd4dcf1';

  constructor(public http: HttpClient) {
  }

  getCityWeatherByName(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<string> {
    const dataSub = new Subject<string>();
    this.http.get(this.watherApi(city, metric))
      .subscribe((data) => {
        dataSub.next(data['weather']);
      }, (err) => {
        console.log(err);
      });
    return dataSub;
  }

  getCitiesWeathersByNames(cities: Array<string>, metric: 'metric' | 'imperial' = 'metric'): Subject<any> {
    const citiesSubject = new Subject();
    cities.forEach((city) => {
      citiesSubject.next(
        this.http.get(this.watherApi(city, metric)
      ));
    });
    return citiesSubject;
  }

  getWeatherState(city: string): Subject<string> {
    const dataSubject = new Subject<string>();
    this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.api_key}`)
      .subscribe((data) => {
        dataSubject.next(data['weather'][0].main);
      });
    return dataSubject;
  }

  getCurrentTemp(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const dataSubject = new Subject<number>();
    this.http.get(this.watherApi(city, metric))
      .subscribe((weather: any) => {
        dataSubject.next(Math.round(Number(weather.main.temp)));
      });
    return dataSubject;
  }


  getCurrentHum(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
    const dataSubject = new Subject<number>();
    this.http.get(
      this.watherApi(city, metric))
      .subscribe((weather: any) => {
        console.log(weather);
        dataSubject.next(weather.main.humidity);
      });
    return dataSubject;
  }

  getCurrentWind(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number>  {
    const dataSubject = new Subject<number>();
    this.http.get(this.watherApi(city, metric))
      .subscribe((weather: any) => {
        dataSubject.next(Math.round(Math.round(weather.wind.speed)));
      });
    return dataSubject;
  }

  getMaxTemp(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number>  {
    const dataSubject = new Subject<number>();
    let max: number;
    this.http.get(this.forecastApi(city, metric))
      .subscribe((weather: any) => {
        max = weather.list[0].main.temp;
        weather.list.forEach((value) => {
          if (max < value.main.temp) {
            max = value.main.temp;
          }
        });
        dataSubject.next(Math.round(max));
      });
    return dataSubject;
  }

  getMinTemp(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number>  {
    const dataSubject = new Subject<number>();
    let min: number;
    this.http.get(this.forecastApi(city, metric))
      .subscribe((weather: any) => {
        min = weather.list[0].main.temp;
        weather.list.forEach((value) => {
          if (min > value.main.temp) {
            min = value.main.temp;
          }
        });
        dataSubject.next(Math.round(min));
      });
    return dataSubject;
  }

  getForecast(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<Array<any>>  {
    const dataSubject = new Subject<Array<any>>();
    this.http.get(this.forecastApi(city, metric))
      .subscribe((weather: any) => {
        dataSubject.next(weather.list);
      });
    return dataSubject;
  }


  watherApi(city: string, metric: 'metric' | 'imperial' = 'metric'): string {
    return `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metric}&APPID=${this.api_key}`;
  }

  forecastApi(city: string, metric: 'metric' | 'imperial' = 'metric'): string {
    return `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metric}&APPID=${this.api_key}`;
  }

}
