import { Injectable, inject } from "@angular/core";
import {
  Firestore,
  Unsubscribe,
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
} from "@angular/fire/firestore";
import { Game } from "../../models/game";

@Injectable({
  providedIn: "root",
})
export class CardjsonService {
  game = new Game();
  firestore = inject(Firestore);

  unsubGame!: Unsubscribe;

  constructor() {}

  subGame(id: string) {
    this.unsubGame = onSnapshot(doc(this.getGamesRef(), id), (doc) => {
      if (doc.exists()) {
        const game = doc.data();
        // console.log(game['players']);
        this.game.currentPlayer = game["currentPlayer"];
        this.game.playedCards = game["playedCards"];
        this.game.players = game["players"];
        this.game.stack = game["stack"];
        console.log(this.game.players);
      }
    });
    // this.ngOnDestroy();
  }

  async addGame(item: {}) {
    await addDoc(this.getGamesRef(), item)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef?.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getGamesRef() {
    return collection(this.firestore, "games");
  }

  ngOnDestroy(): void {
    this.unsubGame();
  }
}
