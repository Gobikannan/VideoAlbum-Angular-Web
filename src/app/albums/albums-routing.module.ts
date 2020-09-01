import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumsListComponent } from './albums-list/albums-list.component';
import { AlbumsHomeComponent } from './albums-home/albums-home.component';
import { EditAlbumComponent } from './edit-album/edit-album.component';

const routes: Routes = [
    {
        path: '', component: AlbumsHomeComponent,
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: AlbumsListComponent },
            { path: 'new', component: EditAlbumComponent },
            { path: ':id/edit', component: EditAlbumComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AlbumsRoutingModule { }
