// weather-detail.component.ts
import { Component, Input } from '@angular/core';
import { WeatherDetail } from '../../models/weather-detail.model';
import { NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-weather-detail',
  standalone: true,
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.css'],
  imports: [NgIf, NgClass] // Add NgClass
})
export class WeatherDetailComponent {
  @Input() detail!: WeatherDetail;
  @Input() theme: string = 'Light'; // Add theme input
}