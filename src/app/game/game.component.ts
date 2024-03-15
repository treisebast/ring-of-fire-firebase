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

  game: Game = new Game();
  gameId: string = '';
  // service: CardjsonService = inject(CardjsonService);                     // Alternativ auch so zu schreiben


  constructor(private route: ActivatedRoute, public dialog: MatDialog, private service: CardjsonService) {

  }

  ngOnInit(): any {
    // this.newGame();
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      this.service.subGame(this.gameId).subscribe((data) => {
        this.game = data;
      });
    });
  }

  // newGame() {
  //   this.game = new Game();
  //   console.log(this.game);
  // }

  updateGame() {
    this.service.updateGame(this.gameId, this.game);
  }


  takeCard() {
    if (!this.game.pickCardAnimation && this.game.stack.length > 0) {
      this.game.currentCard = this.game.stack.pop()!;
      this.game.pickCardAnimation = true;
      // console.log(this.currentCard);
      // console.log(this.game);
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.updateGame();

      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.updateGame();
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result && result.length > 0) {
        this.game.players.push(result);
        this.updateGame();
      }
    });
  }
}

