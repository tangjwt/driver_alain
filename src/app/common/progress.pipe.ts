import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'progress'
})
export class ProgressPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch(value){
      case 'FAIL':
      case 'ERROR':
      case false:
      case 'P0':{
        return 'red';
      }
      case 'CANCELED':
      case 'PAUSED':
      case 'P1':{
        return 'orange';
      }
      case 'RUNNING':
      case 'P2':{
        return 'blue';
      }
      case 'P3':{
        return 'secondary';
      }
      case 'P4':{
        return 'light';
      }
      case 'FINISHED':
      case true:
      case 'PASS':{
        return 'green';
      }
    }

    if (value=="100.00") {
      return "green";
    } else if(parseFloat(value) < 50 && parseFloat(value)>=10) {
      return "orange";
    } else if(parseFloat(value) < 10){
      return "red";
    } else{
      // info 颜色与success太相近
     // return "warning";
     return "blue";
    }
  }

}
