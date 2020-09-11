import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersModel } from '../models/users.model';
import { BatchModel } from '../models/batch.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { CatalogsModel } from '../models/catalogs.model';


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
    console.log(data);
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

  getLastBatch(){
    return this.db.collection('batch', ref => ref.limit(5).orderBy("_ts", "desc")).snapshotChanges();
  }
  getBatchesWhereStatusDone(){
    //var batchRef = this.db.firestore.
  }

  getBatchbyId(id:string){
    return this.db.collection('batch').doc(id).snapshotChanges();
  }
  getBatchbyTech(tech: string){
    return this.db.collection('batch', ref => ref.where('tech', '==', tech)).snapshotChanges();
  }
  getBatchbyUser(user: string){
    return this.db.collection('batch', ref => ref.where('user', '==', user)).snapshotChanges();
  }
  updateBatch(id:string, data:BatchModel){
    return this.db.collection('batch').doc(id).set(data);
  }

  getBatchbyStatus(status: string){
    return this.db.collection('batch', ref => ref.where('Status', '==' , status)).snapshotChanges();
  }
  async updateComment(id:string, commentTxt: string){
    let data ={
      Comment: commentTxt
    }
    this.db.collection('batch').doc(id).update(data);
  }
  assignTech(id:string, techTxt:string){
    let data = {
      tech : techTxt,
      Status : "Tech Assign"
    }
    return this.db.collection('batch').doc(id).update(data);
  }
  changeStatus(id:string, status: string){
    let data = {
      Status: status
    }
    return this.db.collection('batch').doc(id).update(data);
  }

  getTechList(){
    let data : UsersModel[] = [];

    this.http.get(`${this.url}/users.json`).subscribe(res => {
      for (const key in res) {
        let user : UsersModel;
        for(const secKey in res[key]){
          user = res[key][secKey];
          user.fbid = secKey;
        }
        user.id = key;
        if(user.type == 1) data.push(user);    
      }
    });
    return data;
  }


  getAllLines(){
    let data = [];
    this.http.get(`${this.url}`).subscribe(res=>{
      for(const key in res){
        data.push(key);
      }
    })
    return data;
  }

  getCatalogsByLine(Line: string){
    let data : CatalogsModel[] = [];
    this.http.get(`${this.url}/${Line}.json`).subscribe(res=>{
      for(const key in res){
        let catalog: CatalogsModel;
          catalog = res[key];
          data.push(catalog);
          console.log(res[key]);
          console.log(data);
      }
    })
    return data;
  }

}
