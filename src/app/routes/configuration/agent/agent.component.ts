import { Component, OnInit } from '@angular/core';
import { AgentManageService } from '../../../services/agent-manage.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NzMessageService } from 'ng-zorro-antd/message';
import { STColumn } from '@delon/abc';
import { STPage } from '@delon/abc';

@Component({
  selector: 'sn-agent',
  templateUrl: './agent.component.html',
  styles: [
  ]
})
export class AgentComponent implements OnInit {

  agents: Array<any>;
  page: STPage = {
    show: true,
    showSize: true
  };
  columns: STColumn[] = [{
    title: 'ip',
    index: 'ip'
  }, {
    title: 'running',
    index: 'running'
  }
  ];

  constructor(
    private agentService: AgentManageService,
    ) { }

  ngOnInit() {
    this.agentService.getAgentList().subscribe(data => {
      this.agents = data.data ? data.data : [];
    });
  }
}
