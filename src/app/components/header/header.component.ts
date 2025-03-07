import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  currentTheme = 'Light';
  location = 'Khulna, Bangladesh';
  profileName = 'Wow Rakibul';
  avatarUrl = 'assets/avatar.png';

  @Output() searchEvent = new EventEmitter<string>();

  onMenuClick() {
    console.log('Menu clicked');
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'Light' ? 'Dark' : 'Light';
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
