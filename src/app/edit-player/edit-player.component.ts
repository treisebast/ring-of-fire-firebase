import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule, MatDialogModule],
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.scss',
})
export class EditPlayerComponent {


  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>){}

  allProfilPictures = [
    'avatar-1299805_640.png',
    'emoji-2639738_640.png',
    'kid-1837375_640.png',
    'penguin-4871045_640.png',
    'woman-995164_640.png',
    'fish-33712_640.png',
    'user-310807_640.png',
    'butterfly-fish-1331812_640.png',
    'tiger-160601_640.png'
  ];


}
