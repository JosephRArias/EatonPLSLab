import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { BatchModel } from '../models/batch.model';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent implements OnInit {

  Purposes = ['VN', 'Deviation', 'PPQI', 'PPAP', 'UL', 'MPD', 'MSA', 'Calibration Band', 'Production','Cost Saving'];
  Catalogs = ['One', 'Two', 'Three'];
  Lines = ['Smart Breakers', 'CHF2P'];
  LineSelected : string;
  filteredCatalogs: Observable<string[]>;
  filteredLines: Observable<string[]>;
  Username: any;
  TestTypes: Array<String> = ['Thermal 135%', 'Thermal 200%', 'Thermal HotBox', 'Endurance',
  'Magnetica', 'Electronica', 'MV Drop', 'Temperature Rise', 'Calibracion', 'Impedancia', 'Otra (Especifique en comentarios)'];
  
  formArray: FormArray;

  constructor(public requestForm: BatchModel, private firebase: FirebaseService, private router: Router) {
    this.formArray = this.requestForm.Batch.get('TestTypes') as FormArray;
  }

  ngOnInit() {
    this.Username = localStorage.getItem('userDetail').split(',');
    
    this.filteredCatalogs = this.requestForm.Batch.controls['Catalog'].valueChanges
      .pipe(
        startWith(''),
        map(value => this.CatalogsFilter(value))
      );
          this.filteredLines = this.requestForm.Batch.controls['Line'].valueChanges
    .pipe(
      startWith(''),
      map(value => this.LinesFilter(value))
    );
  }
  private CatalogsFilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.Catalogs.filter(option => option.toLowerCase().includes(filterValue));
  }
  private LinesFilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.Lines.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    let data = this.requestForm.Batch.value;
    
    this.firebase.addNewBatch(data)
    .then(res => {
      this.requestForm.Batch.reset();
    }).then( () =>{
      // redirect to homepage.
      this.router.navigate(['/']);
    });
  }

  onCheckChange(event: any) {
    /* Selected */
    if (event.target.checked) {
      // Add a new control in the arrayForm
      this.formArray.push(new FormControl(event.target.value));
    } else {
      // find the unselected element
      let i = 0;
      this.formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value === event.target.value) {
          // Remove the unselected element from the arrayForm
          this.formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
}
