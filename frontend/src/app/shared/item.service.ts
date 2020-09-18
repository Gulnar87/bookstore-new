import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';


export class Item {
  body: string;
}


@Injectable()
export class ItemService {

  // items: FirebaseListObservable<Item[]> = null;
  // userId: string;

  // constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
  //   this.afAuth.authState.subscribe(user => {
  //     if(user) this.userId = user.uid
  //   })
  // }


  // Return an observable list with optional query
  // You will usually call this from OnInit in a component
  // getItemsList(): FirebaseListObservable<Item[]> {
  //   if (!this.userId) return;
  //   this.items = this.db.list(`items/${this.userId}`);
  //   return this.items
  // }


  // createItem(item: Item)  {
  //   this.items.push(item)
  // }

}