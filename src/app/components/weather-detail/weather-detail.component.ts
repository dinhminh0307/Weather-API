import { Component, Input } from '@angular/core';
import { WeatherDetail } from '../../models/weather-detail.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-weather-detail',
  standalone: true,
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.css'],
  imports: [NgIf]
})
export class WeatherDetailComponent {
  @Input() detail!: WeatherDetail;
}
