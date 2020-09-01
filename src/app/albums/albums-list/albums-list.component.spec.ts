import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsListComponent } from './albums-list.component';
import { AlbumsModule } from '../albums.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppSettingsService } from 'src/app/core-services/app-settings.service';
import { DataService } from 'src/app/core-services/data.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { AlbumService } from '../services/albums.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteAlbumDialogComponent } from '../delete-album-dialog/delete-album-dialog.component';

describe('AlbumsListComponent', () => {
  let component: AlbumsListComponent;
  let fixture: ComponentFixture<AlbumsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlbumsListComponent],
      imports: [AlbumsModule, BrowserAnimationsModule, HttpClientTestingModule, RouterTestingModule, NgProgressModule, NgProgressHttpModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const appSettingsService = TestBed.inject(AppSettingsService);
    const dataService = TestBed.inject(DataService);
    spyOn(dataService, 'getNoParams').and.returnValues(of({ albumPageSize: 10, appName: 'test' }));
    appSettingsService.fetch().then();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the album table page size', () => {
    fixture = TestBed.createComponent(AlbumsListComponent);
    component = fixture.componentInstance;
    expect(component.pageSize).toBe(10);
  });

  it('should load fetchAllAlbums on page load', () => {
    fixture = TestBed.createComponent(AlbumsListComponent);
    component = fixture.componentInstance;
    const albumService = TestBed.inject(AlbumService);
    spyOn(albumService, 'fetchAllAlbums').and.returnValues(of([]));
    component.loadAllAlbums();
    expect(albumService.fetchAllAlbums).toHaveBeenCalled();
  });

  describe('delete album', () => {
    it('should show dialog to confirm delete', () => {
      fixture = TestBed.createComponent(AlbumsListComponent);
      component = fixture.componentInstance;
      spyOn(component.dialog, 'open').and.returnValue({ afterClosed: () => of(true) } as MatDialogRef<DeleteAlbumDialogComponent>);
      component.deleteAlbum({ artist: 'arti', label: 'labl', name: 'Melody', id: 1, stock: 1, type: 'CD', typeId: 2 });
      expect(component.dialog.open).toHaveBeenCalled();
    });
    it('should call delete album service if user confirms to delete', () => {
      fixture = TestBed.createComponent(AlbumsListComponent);
      component = fixture.componentInstance;
      spyOn(component.dialog, 'open').and.returnValue({ afterClosed: () => of(true) } as MatDialogRef<DeleteAlbumDialogComponent>);
      const albumService = TestBed.inject(AlbumService);
      spyOn(albumService, 'deleteAlbum').and.returnValues(of());
      component.deleteAlbum({ artist: 'arti', label: 'labl', name: 'Melody', id: 1, stock: 1, type: 'CD', typeId: 2 });
      expect(albumService.deleteAlbum).toHaveBeenCalledWith(1);
    });
    it('should not call delete album service if user cancels on confirmation dialog', () => {
      fixture = TestBed.createComponent(AlbumsListComponent);
      component = fixture.componentInstance;
      spyOn(component.dialog, 'open').and.returnValue({ afterClosed: () => of(false) } as MatDialogRef<DeleteAlbumDialogComponent>);
      const albumService = TestBed.inject(AlbumService);
      spyOn(albumService, 'deleteAlbum').and.returnValues(of());
      component.deleteAlbum({ artist: 'arti', label: 'labl', name: 'Melody', id: 1, stock: 1, type: 'CD', typeId: 2 });
      expect(albumService.deleteAlbum).not.toHaveBeenCalledWith(1);
    });
  });
});
