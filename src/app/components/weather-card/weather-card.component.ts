import { Component, Input, OnInit } from '@angular/core';
import { CurrentWeather } from '../../models/current-weather.model';
import { NgClass, NgForOf } from '@angular/common';

@Component({
  selector: 'app-weather-card',
  standalone: true,
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css'],
  imports: [NgClass, NgForOf]
})
export class WeatherCardComponent implements OnInit{
  // Input property for the current weather data for one city
  @Input() currentWeather!: CurrentWeather;
  // Input for theme and temperature unit, to style the card and show unit labels.
  @Input() theme: string = 'Light';
  @Input() temperatureUnit: 'Fahrenheit' | 'Celsius' = 'Celsius';

  ngOnInit(): void {
    this.currentWeather.temperature = +(((this.currentWeather.temperature - 32) * 5 / 9).toFixed(1));
    this.currentWeather.feelsLike = +(((this.currentWeather.feelsLike - 32) * 5 / 9).toFixed(1));
  }
}
