import { Component, HostBinding, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './home/home.component';
import { CityService } from './services/city.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    HomeComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'weather-api';
  theme: string = 'Light';
  searchQuery: string = 'Hanoi';
  citiesList: Array<string> = [];

  // Bind a class on the host element based on the current theme.
  @HostBinding('class') themeClass = 'light-mode';

  constructor(private cityService: CityService) { }

  handleSearch(query: string): void {
    this.searchQuery = query;
    console.log(this.searchQuery);
  }

  handleTheme(theme: string): void {
    console.log('Theme toggled to:', theme);
    this.theme = theme;
    // Update the host class for dark/light mode.
    this.themeClass = theme === 'Dark' ? 'dark-mode' : 'light-mode';
  }

  ngOnInit(): void {
    // Fetch all cities and map to city names.
    this.cityService.getAllCities().subscribe((cities) => {
      this.citiesList = cities.map(city => city.name);
    });
  }
}
