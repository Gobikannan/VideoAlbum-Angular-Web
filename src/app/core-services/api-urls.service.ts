import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ApiUrlService {

    appSettings = 'AppSettings';
    albumList = 'albums/list';
    albumId = 'albums/';
    albumTypes = 'albumType';
    album = 'albums';
}
