import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ApiUrlService } from './api-urls.service';
import { AppSettings } from '../models/app-settings';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  private appSettings: AppSettings;
  constructor(private dataService: DataService, private apiUrlService: ApiUrlService) { }

  get settings(): AppSettings {
    return this.appSettings;
  }

  fetch(): Promise<any> {
    const url = this.apiUrlService.appSettings;
    return new Promise((resolve, reject) => {
      this.dataService.getNoParams<any>(url).subscribe(x => {
        this.appSettings = x;
        resolve(true);
      }, error => {
        resolve(true);
      });
    });
  }
}
