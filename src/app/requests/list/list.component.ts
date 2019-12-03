import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import * as _ from 'lodash';
import swal from'sweetalert2';
import { BatchModel } from 'src/app/models/batch.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  batch :any[] = [];
  batch2:any[] = [];
  completed: any[] = [];
  data: any[] = [];
  userProfile:any;
  userType:any;
  techUsers:any;
  public searchFilter: string;
  public Order = 'ASC';

  constructor(private firebase:FirebaseService) {
    this.userProfile = localStorage.getItem('userDetail').split(',');
    this.userType = localStorage.getItem('accessReference');
   }

  ngOnInit() {
    this.supervisor();
  }
  supervisor() {
    //get tech userList
    this.techUsers = this.firebase.getTechList();

    this.firebase.getAllBatch().subscribe((snapshot) => {
      this.batch = [];
      this.batch2 = [];
      
      snapshot.forEach((data:any)=>{

        let dataCont = data.payload.doc.data();

        if(dataCont.Status != "Done"){
          this.batch.push({
            id: data.payload.doc.id,
            data: dataCont
          });
          console.log(this.batch);

          if(!dataCont.tech){  
            this.batch2.push({
              id: data.payload.doc.id,
              data: dataCont
            });
          }
        }else{
          this.completed.push({
            id: data.payload.doc.id,
            data: dataCont
          });
        }

      });
    });

  }

  details(id:string){
    console.log(id);
  }
  getBatchesByID(batchID: string){
     return this.batch.filter(foundBatch=>foundBatch.BatchID == batchID);
  }
  Sort(Criteria: string){
    if(Criteria === 'Priority'){
      this.data = this.batch.sort(this.SortByPriority);
    }
    else if(Criteria === 'Status'){
      this.data = this.batch.sort(this.SortByStatus);
    }
  }

  selectTech(id:string, tech:string){
    this.firebase.asignTech(id, tech).then(res => {
      swal.fire('Batch Updated', 'Tech Assigned...', 'success');
    }).catch(res => {
      swal.fire('Something Wrong', 'Try Again... ' + res, 'error');
    });
  }
  SortByPriority(c1: any, c2: any){
    console.log(this.Order);
    if(this.Order === 'ASC'){
      if(c1.data.Priority > c2.data.Priority){
        this.Order = 'DESC';
        return 1;
      }
      else if(c1.data.Priority === c2.data.Priority){
        this.Order = 'DESC';
        return 0;
      }
      else {
        this.Order = 'DESC';
        return -1;
      }
    }

  }
  SortByStatus(c1: any, c2: any){
    if(c1.data.Status > c2.data.Status){
      return 1;
    }
    else if(c1.data.Status === c2.data.Status){
      return 0;
    }
    else {
      return -1;
    }

  }

}
