import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';

export class BatchModel {

  constructor(private firestore: AngularFirestore) {}
  
  Batch = new FormGroup({
    BatchID: new FormControl({value: '', disabled: true}),
    Status: new FormControl('New'),
    Tech: new FormControl(null),
    DueDate: new FormControl('', Validators.required),
    Breakers: new FormControl('', Validators.required),
    Priority: new FormControl,
    TestTypes: new FormArray([]),
    Catalog: new FormControl('', Validators.required),
    Purpose: new FormControl,
    Comment: new FormControl,
    Requestor: new FormControl({value: '', disabled: true}),
    _ts: new FormControl(new Date().getTime()),
  });

}