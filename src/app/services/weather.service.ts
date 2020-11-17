import { WeatherItem } from './../models/weather-item';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  public items: WeatherItem[];

  constructor(private http: HttpClient) { }

  getWeatherItems() {
    return this.items;
  }

  addWeatherItem(weatherItem: WeatherItem) {
      this.items.push(weatherItem);
  }

  clearWeatherItems() {
      this.items.splice(0);
  }

  searchWeatherData(cityName: string): Observable<any> {
    return this.http.get('http://api.openweathermap.org/data/2.5/weather?q=' +
    cityName + '&APPID=b34465051e9774da8a19095f93e9a079&units=imperial')
    .pipe(map(response => {
      return response;
      }),
    catchError(this.erroHandler));
  }

  erroHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server Error');
  }

}
