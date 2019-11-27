import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';

export class BatchModel {

  constructor(private firestore: AngularFirestore) {
  }
  
  Batch = new FormGroup({
    Breakers: new FormControl('', Validators.required),
    Priority: new FormControl,
    TestTypes: new FormArray([]),
    Catalog: new FormControl('', Validators.required),
    Purpose: new FormControl,
    Comment: new FormControl,
    Line: new FormControl('', Validators.required),
    Disposition: new FormControl,
    BatchID: new FormControl,

    Status: new FormControl('New'),
    tech: new FormControl(null),
    user: new FormControl(localStorage.getItem('userDetail').split(',')[1]),
    _ts: new FormControl(new Date().getTime()),
  });

}