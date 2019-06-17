import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class RealtimeService {
  
  phrasesCollection: any[] = [];


  constructor(private firestore: AngularFirestore) {
    this.getData();
  }

  getData(){
   
   this.firestore.firestore.collection("Phrases").onSnapshot({ includeMetadataChanges: true }, (snapshot) => {
   
    snapshot.docChanges().forEach((change) => {

        if(change.type === "added"){
          //console.log("added", change.doc.data());
          this.phrasesCollection.push(change.doc.data());
        
        }

      });
      let source = snapshot.metadata.fromCache ? "local cache" : "firebase server";
      console.log("Data came from " + source);

      console.log(this.phrasesCollection);
      return this.phrasesCollection;
    });
   
  }

  addPhrase(phrase: any){
    let newphrase = {
      author: phrase["author"],
      quote: phrase["quote"]
    }
  
    this.firestore.collection("Phrases").add(newphrase);
  }

  


}
