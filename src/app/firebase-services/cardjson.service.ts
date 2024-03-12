import { Injectable, inject } from "@angular/core";
import { DocumentData, Firestore, collection, onSnapshot } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class CardjsonService {

  firestore: Firestore = inject(Firestore);

  constructor() {
    
  }
    
  subGame() {
    return onSnapshot(this.getGamesRef(), (list) => {
      list.forEach(element => {
        console.log(element.data());
      });
    });
   }
 
   getGamesRef() {
    return collection(this.firestore, 'games');
 }
  
}
