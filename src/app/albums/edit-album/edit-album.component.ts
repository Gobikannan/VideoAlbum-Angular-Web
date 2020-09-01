import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlbumType } from '../models/album-type';
import { Album } from '../models/album';
import { AlbumService } from '../services/albums.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-edit-album',
  templateUrl: './edit-album.component.html',
  styleUrls: ['./edit-album.component.scss']
})
export class EditAlbumComponent implements OnInit {
  albumId: number;
  formGroup: FormGroup;
  name: FormControl;
  artist: FormControl;
  label: FormControl;
  typeId: FormControl;
  stock: FormControl;
  albumTypes: AlbumType[];

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,
    private notificationService: NotificationService, private albumService: AlbumService, private router: Router) {
    this.route.params.subscribe(params => {
      const id = 'id';
      this.albumId = +params[id];
      this.initiateForm();
      this.loadAlbumDetail();
    });
  }

  ngOnInit(): void {
    this.loadAlbumTypes();
  }

  loadAlbumTypes(): void {
    this.albumService.fetchAlbumTypes().subscribe(albumTypes => {
      this.albumTypes = albumTypes;
    }, error => {
      this.notificationService.showNotification('An error occurred while loading Album Types', true);
    }
    );
  }

  loadAlbumDetail(): void {
    if (!this.albumId) {
      return;
    }
    this.albumService.fetchDetails(this.albumId).subscribe(albumDetail => {
      this.name.setValue(albumDetail.name);
      this.artist.setValue(albumDetail.artist);
      this.typeId.setValue(albumDetail.typeId);
      this.label.setValue(albumDetail.label);
      this.stock.setValue(albumDetail.stock);
    }, error => {
      this.notificationService.showNotification('An error occurred while loading Album Details', true);
    }
    );
  }

  initiateForm(): void {
    this.name = new FormControl('', [Validators.required]);
    this.artist = new FormControl('', [Validators.required]);
    this.typeId = new FormControl('', [Validators.required]);
    this.label = new FormControl('', [Validators.required]);
    this.stock = new FormControl(0, [Validators.required]);

    this.formGroup = this.formBuilder.group({
      name: this.name,
      artist: this.artist,
      label: this.label,
      typeId: this.typeId,
      stock: this.stock
    });
  }

  onSubmit(): void {
    if (!this.formGroup.valid) {
      this.notificationService.showNotification('Please fill all mandatory fields', true);
      return;
    }
    const album: Album = {
      name: this.name.value,
      artist: this.artist.value,
      label: this.label.value,
      stock: +this.stock.value,
      typeId: this.typeId.value,
      type: '',
      id: this.albumId
    };
    this.albumService.createOrUpdateAlbum(album).subscribe(x => {
      this.notificationService.showNotification(`Album(${album.name}) ${this.albumId ? 'updated' : 'created'} successfully.`);
      this.router.navigate(['/albums/list']);
    }, error => {
      this.notificationService
        .showNotification(`An error occurred while ${this.albumId ? 'updating' : 'creating'} Album(${album.name}). Please try again or contact admin.`, true);
    });
  }
}
