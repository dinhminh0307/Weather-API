import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './home/home.component';
import { COLLECTION_PATH } from '../firebase/fire-base.operations';
import { CityService } from './services/city.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    HomeComponent
  ],
  // Remove providers array completely
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'weather-api';
  theme: string = 'Light';
  searchQuery: string = 'Hanoi';

  handleSearch(query: string): void {
    this.searchQuery = query;
    console.log(this.searchQuery);
  }

  handleTheme(theme: string): void {
    console.log('Theme toggled to:', theme);
    this.theme = theme;
  }
}
