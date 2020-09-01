import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumsListComponent } from './albums-list/albums-list.component';
import { MaterialComponentsModule } from '../utils/material-components.module';
import { AlbumsRoutingModule } from './albums-routing.module';
import { AlbumsHomeComponent } from './albums-home/albums-home.component';
import { EditAlbumComponent } from './edit-album/edit-album.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteAlbumDialogComponent } from './delete-album-dialog/delete-album-dialog.component';

@NgModule({
  declarations: [AlbumsListComponent, AlbumsHomeComponent, EditAlbumComponent, DeleteAlbumDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialComponentsModule,
    AlbumsRoutingModule
  ],
  entryComponents: [DeleteAlbumDialogComponent]
})
export class AlbumsModule { }
