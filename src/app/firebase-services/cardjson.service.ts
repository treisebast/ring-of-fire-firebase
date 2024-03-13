import { Injectable, inject } from "@angular/core";
import {
  Firestore,
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
  game!: Game;
  firestore = inject(Firestore);

  unsubGame: () => void = () => {};

  constructor() {
    // this.unsubGame = this.subGame(id);
  }

  async subGame(id: string) {
    return onSnapshot(doc(this.getGamesRef(), id), (doc) => {
        if (doc.exists()) {
            const data = doc.data();
            console.log(data, doc.id);
            this.game.currentPlayer = data['currentPlayer'];
            this.game.playedCards = data['playedCards'];
            this.game.players = data['players'];
            this.game.stack = data['stack'];
        }
    });
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
