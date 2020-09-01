import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from '../models/album';

import { DataService } from '../../core-services/data.service';
import { ApiUrlService } from '../../core-services/api-urls.service';
import { AlbumType } from '../models/album-type';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AlbumService {

    private cacheAlbumTypes$: Observable<AlbumType[]>;
    constructor(private dataService: DataService, private apiUrlService: ApiUrlService) { }

    fetchAllAlbums(): Observable<Album[]> {
        const url = this.apiUrlService.albumList;
        return this.dataService.getNoParams<any>(url);
    }

    fetchDetails(id: number): Observable<Album> {
        const url = this.apiUrlService.albumId + id;
        return this.dataService.getNoParams<any>(url);
    }

    createOrUpdateAlbum(data: Album): Observable<object> {
        if (data.id) {
            return this.updateAlbum(data);
        } else {
            return this.createNewAlbum(data);
        }
    }

    private createNewAlbum(data: Album): Observable<object> {
        const url = this.apiUrlService.album;
        return this.dataService.post(data, url);
    }

    private updateAlbum(data: Album): Observable<object> {
        const url = this.apiUrlService.album;
        return this.dataService.put(data, url);
    }

    deleteAlbum(id: number): Observable<object> {
        const url = this.apiUrlService.albumId + id;
        return this.dataService.delete(url);
    }

    // store it locally for now to reuse the same, this is hardly going to change
    // when UI is implemented, we will revalidate this or move all these NgRx which is good in longterm
    fetchAlbumTypes(): Observable<AlbumType[]> {
        if (!this.cacheAlbumTypes$) {
            this.cacheAlbumTypes$ = this.callAlbumTypes().pipe(
                shareReplay(200)
            );
        }

        return this.cacheAlbumTypes$;
    }

    callAlbumTypes(): Observable<AlbumType[]> {
        const url = this.apiUrlService.albumTypes;
        return this.dataService.getNoParams<any>(url).pipe(
            map(response => response)
        );
    }
}
