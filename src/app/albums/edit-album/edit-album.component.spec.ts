import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAlbumComponent } from './edit-album.component';
import { AlbumsModule } from '../albums.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlbumService } from '../services/albums.service';
import { of, throwError } from 'rxjs';
import { AlbumType } from '../models/album-type';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification.service';

describe('EditAlbumComponent', () => {
  let component: EditAlbumComponent;
  let fixture: ComponentFixture<EditAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditAlbumComponent],
      imports: [AlbumsModule, BrowserAnimationsModule, HttpClientTestingModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load AlbumTypes on init', () => {
    component.albumId = 1;
    const albumService = TestBed.inject(AlbumService);
    const albumTypes: AlbumType[] = [{ id: 1, name: 'CD' }];
    spyOn(albumService, 'fetchAlbumTypes').and.returnValues(of(albumTypes));
    component.ngOnInit();
    expect(albumService.fetchAlbumTypes).toHaveBeenCalled();
  });

  it('should not call loadAlbumDetail service if it is create new album', () => {
    component.albumId = undefined;
    const albumService = TestBed.inject(AlbumService);
    spyOn(albumService, 'fetchDetails').and.returnValues(of());
    component.loadAlbumDetail();
    expect(albumService.fetchDetails).not.toHaveBeenCalled();
    expect(component.name.value).toBe('');
    expect(component.artist.value).toBe('');
    expect(component.label.value).toBe('');
    expect(component.stock.value).toBe(0);
  });

  it('should call loadAlbumDetail service if it is edit album', () => {
    component.albumId = 1;
    const albumService = TestBed.inject(AlbumService);
    spyOn(albumService, 'fetchDetails').and
      .returnValues(of({ artist: 'Artist', label: 'Label', name: 'Melody', id: 1, stock: 1, type: 'CD', typeId: 2 }));
    component.loadAlbumDetail();
    expect(albumService.fetchDetails).toHaveBeenCalled();
    expect(component.name.value).toBe('Melody');
    expect(component.artist.value).toBe('Artist');
    expect(component.label.value).toBe('Label');
    expect(component.stock.value).toBe(1);
    expect(component.typeId.value).toBe(2);
  });

  it('should update existing album when user submits data', async(() => {
    component.albumId = 1;
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    const albumService = TestBed.inject(AlbumService);
    spyOn(albumService, 'createOrUpdateAlbum').and.returnValue(of({}));
    component.name.setValue('Boul');
    component.artist.setValue('ARR');
    component.label.setValue('FAM');
    component.stock.setValue(1);
    component.typeId.setValue(2);
    component.onSubmit();
    expect(albumService.createOrUpdateAlbum)
      .toHaveBeenCalledWith({ artist: 'ARR', label: 'FAM', name: 'Boul', id: 1, stock: 1, type: '', typeId: 2 });
    expect(router.navigate).toHaveBeenCalledWith(['/albums/list']);
  }));

  it('should show notification after album updates successfully', async(() => {
    component.albumId = 1;
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    const notificationService = TestBed.inject(NotificationService);
    spyOn(notificationService, 'showNotification');
    const albumService = TestBed.inject(AlbumService);
    spyOn(albumService, 'createOrUpdateAlbum').and.returnValue(of({}));
    component.name.setValue('Boul');
    component.artist.setValue('ARR');
    component.label.setValue('FAM');
    component.stock.setValue(1);
    component.typeId.setValue(2);
    component.onSubmit();
    expect(notificationService.showNotification).toHaveBeenCalled();
  }));

  it('should show error notification if there is an error while updating album', async(() => {
    component.albumId = 1;
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    const notificationService = TestBed.inject(NotificationService);
    spyOn(notificationService, 'showNotification');
    const albumService = TestBed.inject(AlbumService);
    spyOn(albumService, 'createOrUpdateAlbum').and.returnValue(throwError('Unknown error'));
    component.name.setValue('Boul');
    component.artist.setValue('ARR');
    component.label.setValue('FAM');
    component.stock.setValue(1);
    component.typeId.setValue(2);
    component.onSubmit();
    expect(notificationService.showNotification).toHaveBeenCalledWith(`An error occurred while updating Album(Boul). Please try again or contact admin.`, true);
  }));

  it('should create new album when user submits data', async(() => {
    component.albumId = undefined;
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    const albumService = TestBed.inject(AlbumService);
    spyOn(albumService, 'createOrUpdateAlbum').and.returnValue(of({}));
    component.name.setValue('Bouleva');
    component.artist.setValue('DEV');
    component.label.setValue('FAMS');
    component.stock.setValue(11);
    component.typeId.setValue(12);
    component.onSubmit();
    expect(albumService.createOrUpdateAlbum)
      .toHaveBeenCalledWith({ artist: 'DEV', label: 'FAMS', name: 'Bouleva', id: undefined, stock: 11, type: '', typeId: 12 });
    expect(router.navigate).toHaveBeenCalledWith(['/albums/list']);
  }));

  it('should show notification after new album created successfully', async(() => {
    component.albumId = undefined;
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    const notificationService = TestBed.inject(NotificationService);
    spyOn(notificationService, 'showNotification');
    const albumService = TestBed.inject(AlbumService);
    spyOn(albumService, 'createOrUpdateAlbum').and.returnValue(of({}));
    component.name.setValue('Bouleva');
    component.artist.setValue('DEV');
    component.label.setValue('FAMS');
    component.stock.setValue(11);
    component.typeId.setValue(12);
    component.onSubmit();
    expect(notificationService.showNotification).toHaveBeenCalled();
  }));

  it('should show error notification if there is an error while creting new album', async(() => {
    component.albumId = undefined;
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    const notificationService = TestBed.inject(NotificationService);
    spyOn(notificationService, 'showNotification');
    const albumService = TestBed.inject(AlbumService);
    spyOn(albumService, 'createOrUpdateAlbum').and.returnValue(throwError('unknown error'));
    component.name.setValue('Bouleva');
    component.artist.setValue('DEV');
    component.label.setValue('FAMS');
    component.stock.setValue(11);
    component.typeId.setValue(12);
    component.onSubmit();
    expect(notificationService.showNotification).toHaveBeenCalledWith(`An error occurred while creating Album(Bouleva). Please try again or contact admin.`, true);
  }));
});
