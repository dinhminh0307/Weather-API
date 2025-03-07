// src/app/components/current-weather/current-weather.component.ts
import { Component, OnInit } from '@angular/core';
import { CurrentWeather } from '../../models/current-weather.model';
import { WeatherService } from '../../services/current-weather.service';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-current-weather',
  imports:[NgIf],
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
  currentWeather!: CurrentWeather;
  loading = false;
  error = '';

  // Optional: store the chosen unit of measure (for future expansion)
  temperatureUnit: 'Fahrenheit' | 'Celsius' = 'Fahrenheit';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.fetchWeather('Hanoi'); // Replace with desired city
    console.log('CurrentWeatherComponent initialized');
  }

  fetchWeather(city: string): void {
    this.loading = true;
    this.error = '';
    this.weatherService.getWeatherByCity(city).subscribe({
      next: (data) => {
        this.currentWeather = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load weather data';
        this.loading = false;
      }
    });
  }

  toggleTemperatureUnit(): void {
    this.temperatureUnit = this.temperatureUnit === 'Fahrenheit' ? 'Celsius' : 'Fahrenheit';
    // In a real scenario, you would convert temperature values accordingly.
  }
}
