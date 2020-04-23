import { Component, OnInit } from '@angular/core';
import { ProjectManageService } from '../../../services/project-manage.service';
import { RunResultService } from '../../../services/run-result.service';
import { SerManageService } from '../../../services/ser-manage.service';

@Component({
  selector: 'sn-overview',
  templateUrl: './overview.component.html',
  styles: []
})
export class OverviewComponent implements OnInit {
  projects = 0;
  services = 0;
  runsets = 0;
  runResults = 0;
  constructor(private projectService: ProjectManageService, private serManageService: SerManageService, private runResultService: RunResultService) { }

  ngOnInit() {
    this.projectService.getProjectList().subscribe(data => {
      this.projects = data.data.length;
    });
    this.serManageService.getServiceList().subscribe(data => {
      this.services = data.data.length;
    });
    this.runResultService.countRunset().subscribe(data =>{
      this.runsets = data.data;
    });
    this.runResultService.countRunResult().subscribe(data =>{
      this.runResults = data.data;
    });
  }

}
