import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-info-player',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './dialog-info-player.component.html',
  styleUrl: './dialog-info-player.component.scss'
})
export class DialogInfoPlayerComponent {
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DialogInfoPlayerComponent>) {}

  
}