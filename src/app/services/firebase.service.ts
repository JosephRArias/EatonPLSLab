import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersModel } from '../models/users.model';
import { BatchModel } from '../models/batch.model';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private url:string = "https://time-logger-3addd.firebaseio.com";

  constructor(private http:HttpClient, public db:AngularFirestore) { 
    
  }


  createUser(user:UsersModel){
    let username = user.email.split('@');
    return this.http.post(`${this.url}/users/${username[0]}.json`, user);
  }

  getUser(mail:string){
    let username = mail.split('@');
    return this.http.get(`${this.url}/users/${username[0]}.json`);
  }

  getAllUsers(){
    let data : UsersModel[] = [];

    this.http.get(`${this.url}/users.json`).subscribe(res => {
      for (const key in res) {
        let user : UsersModel;
        for(const secKey in res[key]){
          user = res[key][secKey];
          user.fbid = secKey;
        }
        user.id = key;
        data.push(user);    
      }
    });
    return data;
  }

  deleteUser(username: string){
    return this.http.delete(`${this.url}/users/${username}.json`).subscribe();
  }

  changeUserType(user: UsersModel){
    if(user.type == 5){
      user.type = 0;
    } else{
      user.type++;
    }
    
    const data = {
      "email": user.email,
      "name": user.name,
      "supervisor": user.supervisor,
      "type": user.type
    }

    return this.http.put(`${this.url}/users/${user.id}/${user.fbid}.json`, data).subscribe();
  }

  addNewBatch(batch: BatchModel){
    return this.db.collection('batch').add(batch);
  };

  getAllBatch(){
    return this.db.collection('batch').snapshotChanges();
  }

  getBatchbyId(id:string){
    this.db.collection('batch').doc(id).snapshotChanges();
  }

  updateBatch(id:string, data:BatchModel){
    return this.db.collection('batch').doc(id).set(data);
  }

}
