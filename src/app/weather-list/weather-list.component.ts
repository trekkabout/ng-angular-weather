import { Component, OnInit } from '@angular/core';
import { WeatherItem } from '../models/weather-item';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.scss']
})
export class WeatherListComponent implements OnInit {
  weatherItems: WeatherItem[];

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherItems = this.weatherService.getWeatherItems();
  }

}
