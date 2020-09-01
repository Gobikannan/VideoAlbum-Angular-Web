import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppSettingsService } from './core-services/app-settings.service';

export function loadAppSettings(appSettingsService: AppSettingsService) {
    return () => appSettingsService.fetch();
}

@NgModule({
    imports: [HttpClientModule],
    providers: [
        AppSettingsService,
        { provide: APP_INITIALIZER, useFactory: loadAppSettings, deps: [AppSettingsService], multi: true }
    ]
})
export class AppSettingsModule { }
