import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { CurrentWeather } from '../../models/current-weather.model';
import { WeatherService } from '../../services/current-weather.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-current-weather',
  imports: [NgIf],
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit, OnChanges {
  @Input() searchQuery: string = 'Hanoi';  // Default city if no value is provided

  currentWeather!: CurrentWeather;
  loading = false;
  error = '';

  // Optional: store the chosen unit of measure (for future expansion)
  temperatureUnit: 'Fahrenheit' | 'Celsius' = 'Fahrenheit';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.fetchWeather(this.searchQuery);
    console.log('CurrentWeatherComponent initialized with searchQuery:', this.searchQuery);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchQuery'] && !changes['searchQuery'].isFirstChange()) {
      this.fetchWeather(this.searchQuery);
    }
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
