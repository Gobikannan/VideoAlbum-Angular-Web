import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor(private http: HttpClient) { }

    get<T>(param: T, url: string) {
        return this.http.get(environment.apiUrl + url, param);
    }

    getNoParams<T>(url: string) {
        return this.http.get<T>(environment.apiUrl + url);
    }

    post<T>(data: T, url: string) {
        return this.http.post(environment.apiUrl + url, data);
    }

    put<T>(data: T, url: string) {
        return this.http.put(environment.apiUrl + url, data);
    }

    delete(url: string) {
        return this.http.delete(environment.apiUrl + url);
    }
}
