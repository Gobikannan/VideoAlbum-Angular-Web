import { Component } from '@angular/core';
import { AppSettingsService } from './core-services/app-settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string;

  constructor(private appSettingsService: AppSettingsService) {
    if (this.appSettingsService.settings && this.appSettingsService.settings.appName) {
      this.title = this.appSettingsService.settings.appName;
    }
  }
}
