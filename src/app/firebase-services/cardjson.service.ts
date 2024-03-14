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
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CardjsonService {
  // private dataSubject = new Subject<any>();
  // dataFromFirebase$: Observable<any> = this.dataSubject.asObservable();

  gameId: string = "";

  firestore = inject(Firestore);

  unsubGame!: Unsubscribe;

  constructor() { }

  private gameIdSubject: Subject<string> = new Subject<string>();
  gameId$: Observable<string> = this.gameIdSubject.asObservable();

  setGameId(gameId: string) {
    this.gameIdSubject.next(gameId);
  }
  

  subGame(id: string): Observable<any> {
    return new Observable<any>(observer => {
      this.unsubGame = onSnapshot(doc(this.getGamesRef(), id), (doc) => {
        if (doc.exists()) {
          let gameData = doc.data();
          console.log('service', gameData);
          observer.next(gameData); // Senden Sie aktualisierte Daten an die Observer
        }
      });
    });
  }

  async addGame(item: {}): Promise<string> {
    return await addDoc(this.getGamesRef(), item)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
      })
      .catch((err) => {
        console.log(err);
        return '';
      });
  }

  getGamesRef() {
    return collection(this.firestore, "games");
  }

  ngOnDestroy(): void {
    this.unsubGame();
  }
}
