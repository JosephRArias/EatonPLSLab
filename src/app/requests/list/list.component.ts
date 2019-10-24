import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  batch :any[] = [];
  userProfile:any;

  constructor(private firebase:FirebaseService) {
    this.userProfile = localStorage.getItem('userDetail').split(',');
   }

  ngOnInit() {
    this.firebase.getAllBatch().subscribe((snapshot)=>{
      this.batch = [];
      
      snapshot.forEach((data:any)=>{
        
        let dataCont = data.payload.doc.data();

        if(this.userProfile[1] === dataCont.user){
          this.batch.push({
            id: data.payload.doc.id,
            data: dataCont
          });
        }
      });
    });
  
    
  
  }

}
