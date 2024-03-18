import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton, MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule, MatDialogTitle, MatDialogClose, MatDialogActions, MatDialogContent],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})
export class DialogAddPlayerComponent {
  name: string = '';

  constructor(public dialogRef: MatDialogRef<DialogAddPlayerComponent>){}

  onNoClick(){
    this.dialogRef.close();
  }
}
