import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { MatCardModule } from '@angular/material/card';
import { CardjsonService } from '../firebase-services/cardjson.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatIconModule, MatButtonModule, GameInfoComponent, MatCardModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game = new Game();
  // service: CardjsonService = inject(CardjsonService);


  constructor(private route: ActivatedRoute, public dialog: MatDialog, private service: CardjsonService) { 
    
  }

  ngOnInit(): any {
    this.newGame();
    this.route.params.subscribe((params) => {
      let id: string = params['id'];
      // console.log(id);
      this.service.subGame(id).subscribe((data) => {
        // console.log('Daten von Firebase wurden aktualisiert', data);
        this.game = data;
        // console.log('game.component', this.game);
      });
    });
  }



  newGame() {
    this.game = new Game();
    // console.log(this.game);
  }
  

  takeCard() {
    if (!this.pickCardAnimation && this.game.stack.length > 0) {
      this.currentCard = this.game.stack.pop()!;
      this.pickCardAnimation = true;

      // console.log(this.currentCard);
      // console.log(this.game);

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result && result.length > 0) {
      this.game.players.push(result);
      }
    });
  }

}

