import { Component, OnInit, ViewChild } from '@angular/core';
import { AlbumService } from '../services/albums.service';
import { Album } from '../models/album';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AppSettingsService } from 'src/app/core-services/app-settings.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAlbumDialogComponent } from '../delete-album-dialog/delete-album-dialog.component';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.scss']
})
export class AlbumsListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'artist', 'label', 'type', 'stock', 'action'];
  dataSource = new MatTableDataSource<Album>([]);
  pageSize: number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private albumService: AlbumService, private notificationService: NotificationService,
    public dialog: MatDialog, private appSettingsService: AppSettingsService) {
    if (this.appSettingsService.settings) {
      this.pageSize = this.appSettingsService.settings.albumPageSize;
    }
  }

  ngOnInit(): void {
    this.loadAllAlbums();
  }

  loadAllAlbums(): void {
    this.albumService.fetchAllAlbums().subscribe(albums => {
      this.dataSource = new MatTableDataSource<Album>(albums);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      this.notificationService.showNotification(`An error occurred while loading Albums. Please try again or contact admin.`);
    });
  }

  deleteAlbum(album: Album): void {
    const dialogRef = this.dialog.open(DeleteAlbumDialogComponent, {
      data: { albumName: album.name },
      width: '450px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.albumService.deleteAlbum(album.id).subscribe(x => {
          this.notificationService.showNotification(`Album(${album.name}) deleted successfully.`);
          this.loadAllAlbums();
        }, error => {
          this.notificationService.showNotification(`An error occurred while deleting Album(${album.name}). Please try again or contact admin.`, true);
        });
      }
    });
  }
}
