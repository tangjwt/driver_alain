import { Component, OnInit } from '@angular/core';
import { ProjectManageService } from '../../../services/project-manage.service';
import { RunResultService } from '../../../services/run-result.service';
import { SerManageService } from '../../../services/ser-manage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Chart } from '@antv/g2';

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
  runSetList = [];
  runSetListRunning = [];
  lineChart;
  chartData = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectManageService,
    private serManageService: SerManageService, 
    private runResultService: RunResultService
    ) { }

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
    const param = {
        page: {
          pageNum: 1,
          pageSize: 5
        },
        params: {
          isPass: false,
          status: 'FINISHED'
        }
    };
    this.runResultService.getRunSetListByParams(param).subscribe(data =>{
      this.runSetList = data.data;
    });

    const param2 = {
      page: {
        pageNum: 1,
        pageSize: 5
      },
      params: {
        isPass: false,
        status: 'RUNNING'
      }
  };
    this.runResultService.getRunSetListByParams(param2).subscribe(data => {
    this.runSetListRunning = data.data;
  });
    this.runResultService.statisticByDay().subscribe(data=>{
    data.data.forEach(item=>{
      this.chartData.push({
        day:item.field,
        runs:item.total,
      });
    });
    this.generateChart();
  });
  }

  generateChart() {

    this.lineChart = new Chart({
     container: 'runTimes', // 指定图表容器 ID
     height : 300, // 指定图表高度
     autoFit: true,
     padding: 40
   });
    this.lineChart.tooltip({
    showCrosshairs: true, // 展示 Tooltip 辅助线
    shared: true,
    });
    this.lineChart.data(this.chartData);
    this.lineChart.line().position('day*runs').label('runs');
    this.lineChart.point().position('day*runs');
   //  渲染图表
    this.lineChart.render();
 }

  jump(id: any){
    this.runResultService.hasSubRunSetList(id).subscribe(data => {
      const hasSub = data.data;
      // 有子run set的情况下，跳转到子run set列表页面
      if (hasSub > 0) {
        // sub run_set 点浏览器回退按钮，回退到run_set列表界面
        // window.history.pushState({},'List','/run/result');
        this.router.navigate(['/run/result/', { id : id }]);
      } else {
        this.router.navigate([`/run/result/${id}/statistic`]);
      }
    });
  }

}
