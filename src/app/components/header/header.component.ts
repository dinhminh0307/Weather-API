import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // optional custom CSS
})
export class HeaderComponent {
  currentTheme = 'Light';
  location = 'Khulna, Bangladesh';
  profileName = 'Wow Rakibul';
  avatarUrl = 'assets/avatar.png';

  onMenuClick() {
    console.log('Menu clicked');
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'Light' ? 'Dark' : 'Light';
    // add your logic to switch themes
  }

  onNotificationsClick() {
    console.log('Notifications clicked');
  }

  onSettingsClick() {
    console.log('Settings clicked');
  }

  onSearch(value: string) {
    console.log('Searching for:', value);
  }
}
