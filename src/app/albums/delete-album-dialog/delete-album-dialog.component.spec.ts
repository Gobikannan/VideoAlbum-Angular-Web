import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAlbumDialogComponent } from './delete-album-dialog.component';
import { AlbumsModule } from '../albums.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';

describe('DeleteAlbumDialogComponent', () => {
  let component: DeleteAlbumDialogComponent;
  let fixture: ComponentFixture<DeleteAlbumDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteAlbumDialogComponent],
      imports: [AlbumsModule, BrowserAnimationsModule, HttpClientTestingModule,
        RouterTestingModule, NgProgressModule, NgProgressHttpModule],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        },
        {
          provide: MatDialogRef,
          useValue: { close: jasmine.createSpy() }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAlbumDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog with true option', () => {
    component.closeDialog(true);
    expect(component.dialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should close dialog with false option', () => {
    component.closeDialog(false);
    expect(component.dialogRef.close).toHaveBeenCalledWith(false);
  });
});
