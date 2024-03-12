import { Injectable, inject } from "@angular/core";
import { Firestore, doc, onSnapshot } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class CardjsonService {

  unsubgame;

  firestore: Firestore = inject(Firestore);

  constructor() {
    this.unsubgame = onSnapshot(doc(this.firestore, "games"), (doc) => {
      if (doc.data()) {
        console.log(doc.data());
      }
    })
    
  }

}
