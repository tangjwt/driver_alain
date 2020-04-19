import { Component, OnInit } from '@angular/core';
import { ProjectManageService } from '../../../services/project-manage.service';
import { SerManageService } from '../../../services/ser-manage.service';

@Component({
  selector: 'sn-overview',
  templateUrl: './overview.component.html',
  styles: []
})
export class OverviewComponent implements OnInit {
  projects = 0;
  services = 0;
  constructor(private projectService: ProjectManageService, private serManageService: SerManageService) { }

  ngOnInit() {
    this.projectService.getProjectList().subscribe(data => {
      this.projects = data.data.length;
    });
    this.serManageService.getServiceList().subscribe(data => {
      this.services = data.data.length;
    });
  }

}
