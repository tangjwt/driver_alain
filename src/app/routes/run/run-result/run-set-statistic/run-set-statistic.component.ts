import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RunResultService } from '../../../../services/run-result.service';

@Component({
  selector: 'sn-run-set-statistic',
  templateUrl: './run-set-statistic.component.html',
  styleUrls: ['./run-set-statistic.component.scss']
})
export class RunSetStatisticComponent implements OnInit {
  results: Array<any> = [];
  constructor(private route: ActivatedRoute, private router: Router, private runResultService: RunResultService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      this.runResultService.getRunResultStatistic(id).subscribe(data => {
        this.results = data.resultList;
      });
    }
    );
  }

}
