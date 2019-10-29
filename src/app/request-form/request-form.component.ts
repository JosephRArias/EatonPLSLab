import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { BatchModel } from '../models/request-form.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent implements OnInit {
  Purposes = ['VN', 'Deviation', 'PPQI', 'PPAP'];
  Username: any;
  TestTypes: Array<String> = ['Thermal 135%', 'Thermal 200%', 'Thermal HotBox', 'Endurance',
  'Magnetica', 'Electronica', 'MV Drop', 'Temperature Rise', 'Calibracion', 'Impedancia', 'Otra(Especifique en comentarios)'];
  constructor(public requestForm: BatchModel, private firebase: FirebaseService) {
   }

  ngOnInit() {
    this.Username = localStorage.getItem('userDetail').split(',');
    this.requestForm.requestForm.get('TestTypes').setValue(this.addTypesControl());
  }
  addTypesControl() {
    const arr = this.TestTypes.map(item => new FormControl());
  }

  onSubmit() {
    let data = this.requestForm.requestForm.value;
    console.log(this.requestForm.requestForm.get('Priority').value);
    this.firebase.addNewBatch(data)
    .then(res => {
      this.requestForm.requestForm.reset();
    });
  }
  onCheckChange(event) {
    const formArray: FormArray = this.requestForm.requestForm.get('TestTypes') as FormArray;
    /* Selected */
    if (event.target.checked) {
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
      console.log(event.target.value);
    } else {
      // find the unselected element
      let i = 0;
      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value === event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }

  }
}
