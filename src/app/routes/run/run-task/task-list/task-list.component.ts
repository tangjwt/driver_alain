import { Component, OnInit, TemplateRef } from '@angular/core';
import { TaskManageService } from '../../../../services/task-manage.service';
import { HEADER } from './task-header';
@Component({
  selector: 'sn-task-list',
  templateUrl: './task-list.component.html',
})
export class TaskListComponent implements OnInit {

  itemsPerPage = 15;
  results: Array<any> = [];
  totalRecords = 0;
  columns = HEADER;
  event: any = {
    paging: 1
  };

  constructor(private taskService: TaskManageService) {
  }

  ngOnInit() {
    this.taskService.getTaskList(1, this.itemsPerPage).subscribe(data => {
      this.results = data.resultList;
      this.totalRecords = data.count;
    });
  }

  public onChangeTable(event: any) {
    console.log(event)
    this.event = event; 
    let taskName: string = "";
    if (this.event.filtering.length > 0) {
      taskName = this.event.filtering[0].filtering
    }
    this.taskService.getTaskList(this.event.paging.currentPage, this.itemsPerPage, taskName).subscribe(data => {
      this.results = data.resultList;
      this.totalRecords = data.count;
    });
  }


  public testss(id:string){
    return id;
  }
  
}
