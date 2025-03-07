import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './home/home.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    // DevExtreme modules
    HeaderComponent,
    HomeComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'weather-api';

  // Default search query (e.g., initial city)
  searchQuery: string = 'Hanoi';

  handleSearch(query: string): void {
    // Update the search query to be passed down to CurrentWeather
    this.searchQuery = query;
    console.log(this.searchQuery);
  }
}
