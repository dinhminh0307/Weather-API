import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';

import { CurrentWeather } from '../../models/current-weather.model';
import { WeatherDetail } from '../../models/weather-detail.model';
import { WeatherService } from '../../services/current-weather.service';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [NgIf],
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit, OnChanges {
  @Input() searchQuery: string = 'Hanoi';  // Default city if no value is provided
  @Output() weatherDetailEvent = new EventEmitter<WeatherDetail>();

  // Encapsulated private properties
  private _currentWeather!: CurrentWeather;
  private _weatherDetail!: WeatherDetail;

  loading = false;
  error = '';

  // Optional: store the chosen unit of measure (for future expansion)
  temperatureUnit: 'Fahrenheit' | 'Celsius' = 'Fahrenheit';

  constructor(private weatherService: WeatherService) {}

  // ----------------------
  // GETTERS & SETTERS
  // ----------------------
  public get currentWeather(): CurrentWeather {
    return this._currentWeather;
  }
  public set currentWeather(value: CurrentWeather) {
    this._currentWeather = value;
  }

  public get weatherDetail(): WeatherDetail {
    return this._weatherDetail;
  }
  public set weatherDetail(value: WeatherDetail) {
    this._weatherDetail = value;
  }

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
      next: (data: CurrentWeather) => {
        // Store the main weather object
        this.currentWeather = data;

        // Retrieve weather detail from the weather service (which was set there)
        this.weatherDetail = this.weatherService.weatherDetail;

        // Emit the weather detail to the parent component (Home)
        this.weatherDetailEvent.emit(this.weatherDetail);

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
    this.temperatureUnit =
      this.temperatureUnit === 'Fahrenheit' ? 'Celsius' : 'Fahrenheit';
    // In a real scenario, you would convert temperature values accordingly.
  }
}
