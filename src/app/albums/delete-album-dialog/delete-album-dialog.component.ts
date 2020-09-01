import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-album-dialog',
  templateUrl: './delete-album-dialog.component.html',
  styleUrls: ['./delete-album-dialog.component.scss']
})
export class DeleteAlbumDialogComponent implements OnInit {

  title = 'Confirm';
  message: string;

  constructor(public dialogRef: MatDialogRef<DeleteAlbumDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.message = `Are you sure want to delete the album(${this.data.albumName})?`;
  }

  ngOnInit(): void { }

  closeDialog(confirmed: boolean): void {
    this.dialogRef.close(confirmed);
  }
}
