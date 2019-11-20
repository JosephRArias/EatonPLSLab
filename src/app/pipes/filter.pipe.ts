import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  temp: any;
  transform(batches: any[], value: any): any {
    const resultBatches = [];
    if(value == '' || value == undefined){
      return batches;
    }
    for(const batch of batches){
      this.temp = String (batch.data.BatchID);
      if(String(batch.data.BatchID).toLowerCase().indexOf(value)>-1){
        resultBatches.push(batch);
      }
    }
    return resultBatches;
    
  };
  }
