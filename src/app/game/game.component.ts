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
import { PlayerMobileComponent } from '../player-mobile/player-mobile.component';
import { DialogInfoPlayerComponent } from '../dialog-info-player/dialog-info-player.component';
import { EditPlayerComponent } from '../edit-player/edit-player.component';



@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatIconModule, MatButtonModule, GameInfoComponent, MatCardModule, PlayerMobileComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {

  gameOver: boolean = false;
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
    if (this.game.stack.length == 0) {
      this.gameOver = true;
    } else if (!this.game.pickCardAnimation && this.game.stack.length > 0) {
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


  editPlayer(playerId: number) {                                  // https://material.angular.io/components/dialog/overview#dialog-overview
    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        if (change == 'DELETE') {
          this.game.players.splice(playerId, 1);
          this.game.player_images.splice(playerId, 1);
          this.updateGame();

        } else {
          this.game.player_images[playerId] = change;
          this.updateGame();
        }
      }
    });
  }


  openDialog(): void {                                             // https://material.angular.io/components/dialog/overview#dialog-overview
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result && result.length > 0) {
        this.game.players.push(result);
        this.game.player_images.push('penguin-4871045_640.png');

        this.updateGame();
      }
    });
  }

  openDialogInfo(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogInfoPlayerComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}

