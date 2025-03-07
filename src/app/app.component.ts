import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    // DevExtreme modules
    HeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'weather-api';
}
