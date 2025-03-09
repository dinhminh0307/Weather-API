import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

import { CurrentWeather } from '../../models/current-weather.model';
import { WeatherDetail } from '../../models/weather-detail.model';
import { WeatherService } from '../../services/current-weather.service';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit, OnChanges {
  @Input() searchQuery: string = 'Hanoi';  // Default city if no value is provided
  @Output() weatherDetailEvent = new EventEmitter<WeatherDetail>();
  
  // We'll maintain a local theme property (default to 'Light') even if an external Input is provided.
  // If you wish to control it only via Input, you can remove this local variable.
  @Input() theme: string = 'Light';

  // Encapsulated private properties
  private _currentWeather!: CurrentWeather;
  private _weatherDetail!: WeatherDetail;

  loading = false;
  error = '';

  // Optional: store the chosen unit of measure (for future expansion)
  temperatureUnit: 'Fahrenheit' | 'Celsius' = 'Celsius';

  constructor(private weatherService: WeatherService, private cityService: CityService) {}

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

        // add city to firebase:
        this.cityService.addCity(city)
      .then(() => console.log('Cityadded successfully'))
      .catch(err => console.error('Error adding city:', err));

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
    if (this.temperatureUnit === 'Fahrenheit') {
      // Convert Fahrenheit to Celsius
      this.currentWeather.temperature = +(((this.currentWeather.temperature - 32) * 5 / 9).toFixed(1));
      this.currentWeather.feelsLike = +(((this.currentWeather.feelsLike - 32) * 5 / 9).toFixed(1));
      // Update detail as well, if needed
      this.weatherDetail.temperature = +(((this.weatherDetail.temperature - 32) * 5 / 9).toFixed(1));
      this.temperatureUnit = 'Celsius';
    } else {
      // Convert Celsius to Fahrenheit
      this.currentWeather.temperature = +((this.currentWeather.temperature * 9 / 5 + 32).toFixed(1));
      this.currentWeather.feelsLike = +((this.currentWeather.feelsLike * 9 / 5 + 32).toFixed(1));
      // Update detail as well
      this.weatherDetail.temperature = +((this.weatherDetail.temperature * 9 / 5 + 32).toFixed(1));
      this.temperatureUnit = 'Fahrenheit';
    }
  }

}
