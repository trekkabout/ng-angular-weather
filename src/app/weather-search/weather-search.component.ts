import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { WeatherItem } from '../models/weather-item';
import { Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.scss']
})
export class WeatherSearchComponent implements OnInit {
  private searchStream = new Subject<string>();
  data: any = {};

  constructor(private weatherService: WeatherService) {
  }

  onSubmit() {
    const weatherItem = new WeatherItem(this.data.name, this.data.weather[0].description, this.data.main.temp);
    this.weatherService.addWeatherItem(weatherItem);
  }

  onSearchLocation(cityName: string) {
    this.searchStream
      .next(cityName);
  }

  ngOnInit() {
    this.searchStream
      .pipe(
        switchMap((input: string) => this.weatherService.searchWeatherData(input)),
        map(data => this.data = data)
      );
  }


}
