import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'progress'
})
export class ProgressPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch(value){
      case 'ERROR':
      case false:{
        return 'red';
      }
      case 'P0':{
        return 'danger';
      }
      case 'FAIL':{
        return 'danger';
      }
      case 'CANCELED':
      case 'PAUSED':{
        return 'orange';
      }
      case 'P1':{
        return 'warning';
      }
      case 'RUNNING':{
        return 'blue';
      }
      case 'P2':{
        return 'primary';
      }
      case 'P3':{
        return 'success';
      }
      case 'P4':{
        return '';
      }
      case 'FINISHED':
      case true:{
        return 'green';
      }
      case 'PASS':{
        return 'success';
      }
      case 'SKIP':{
        return 'primary';
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
