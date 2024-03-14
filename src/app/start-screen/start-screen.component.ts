import { Component,} from '@angular/core';
import { Router } from '@angular/router';
import { CardjsonService } from '../firebase-services/cardjson.service';
import { Game } from '../../models/game';


@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {

  constructor(private router:Router, private service: CardjsonService) {

  }

  newGame() {
    let game = new Game();
    this.service.addGame(game.toJSON()).then(gameId => {
      this.router.navigateByUrl('/game/' + gameId);
      console.log('startscreen', gameId);
    });
  }
}
