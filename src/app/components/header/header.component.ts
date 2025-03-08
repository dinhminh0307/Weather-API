import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [NgClass]
})
export class HeaderComponent {
  @Input() currentTheme = 'Light';
  location = 'Khulna, Bangladesh';
  profileName = 'Wow Rakibul';
  avatarUrl = 'assets/avatar.png';

  @Output() searchEvent = new EventEmitter<string>();
  // header.component.ts (CORRECTED)
  @Output() themeToggle = new EventEmitter<string>(); // was "themToggle"

  onMenuClick() {
    console.log('Menu clicked');
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'Light' ? 'Dark' : 'Light';
    this.themeToggle.emit(this.currentTheme);
  }


  onNotificationsClick() {
    console.log('Notifications clicked');
  }

  onSettingsClick() {
    console.log('Settings clicked');
  }

  onSearch(value: string) {
    console.log('Searching for:', value);
    this.searchEvent.emit(value);
  }
}
