import { Component, Input } from '@angular/core';
import { CurrentWeatherComponent } from '../components/current-weather/current-weather.component';
import { WeatherDetailComponent } from '../components/weather-detail/weather-detail.component';
import { WeatherDetail } from '../models/weather-detail.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CurrentWeatherComponent, WeatherDetailComponent, NgClass],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @Input() searchQuery!: string;
  @Input() theme!: string;
  
  // This property will hold the detailed weather data emitted by CurrentWeatherComponent
  weatherDetailData!: WeatherDetail;

  handleWeatherDetail(detail: WeatherDetail): void {
    this.weatherDetailData = detail;
    console.log('HomeComponent received weather detail:', detail);
  }
}
