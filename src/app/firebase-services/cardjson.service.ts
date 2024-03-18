import { Injectable, inject } from "@angular/core";
import {
  Firestore,
  Unsubscribe,
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "@angular/fire/firestore";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CardjsonService {
  
  gameId: string = "";

  firestore = inject(Firestore);

  unsubGame!: Unsubscribe;

  constructor() { }
  

  subGame(id: string): Observable<any> {
    return new Observable<any>(observer => {
      this.unsubGame = onSnapshot(doc(this.getGamesRef(), id), (doc) => {
        if (doc.exists()) {
          let gameData = doc.data();
          console.log('service', gameData);
          observer.next(gameData); // Observable schickt Daten an View
        }
      });
    });
  }

  async addGame(item: {}): Promise<string> {
    return await addDoc(this.getGamesRef(), item)
      .then((docRef) => {
        // console.log("Document written with ID: ", docRef.id);
        return docRef.id;
      })
      .catch((err) => {
        console.log(err);
        return '';
      });
  }

  // Alternativ zu addGame mit try catch
  // async addGame(item: {}): Promise<string> {
  //   try {
  //     const docRef = await addDoc(this.getGamesRef(), item);
  //     console.log("Document written with ID: ", docRef.id);
  //     return docRef.id;
  //   } catch (err) {
  //     console.log(err);
  //     return '';
  //   }
  // }

  updateGame(id: string, item: {}): Promise<void> {
    return updateDoc(doc(this.getGamesRef(), id), item);
  }

  getGamesRef() {
    return collection(this.firestore, "games");
  }

  ngOnDestroy(): void {
    this.unsubGame();
  }
}
