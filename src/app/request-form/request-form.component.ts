import { Component, OnInit } from '@angular/core';
import { BatchModel } from '../models/batch.model';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent implements OnInit {

  constructor(private firebase: FirebaseService) { }

  ngOnInit() {
  }


  addNew(){

    var newBatch = new BatchModel();
  
    // Populate data from web form

    
    this.firebase.addNewBatch(newBatch);

  }

}
