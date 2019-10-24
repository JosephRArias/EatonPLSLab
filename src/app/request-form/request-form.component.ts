import { Component, OnInit } from '@angular/core';
import { BatchModel } from '../models/batch.model';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent implements OnInit {
  
  userProfile:any;

  constructor(private firebase: FirebaseService) { 
    this.userProfile = localStorage.getItem('userDetail').split(','); // [1] <- user email 
  }

  ngOnInit() {
  }

  addNewRequest(){
    
    var newItem = new BatchModel();
    
    newItem.initDate = new Date();
    newItem.id = ""
    // Llena el item de los datos del form


    this.firebase.addNewBatch(newItem).then(res => {
        console.log(res);

        // Ejecutar accion cuando la data se graba en firebase
        // redireccionar, o mostrar un mensaje, etc...
          
    }).catch(err => {
      console.log(err);
    });
  }

}
