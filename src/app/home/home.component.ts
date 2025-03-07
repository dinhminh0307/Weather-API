import { Component, Input } from '@angular/core';
import { CurrentWeatherComponent } from '../components/current-weather/current-weather.component';

@Component({
  selector: 'app-home',
  standalone: true, // <-- Add this line
  imports: [CurrentWeatherComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @Input() searchQuery!: string;
}
