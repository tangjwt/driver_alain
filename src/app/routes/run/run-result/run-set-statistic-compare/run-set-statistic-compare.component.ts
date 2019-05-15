import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,ParamMap} from '@angular/router';
import { RunResultService } from '../../../../services/run-result.service';

@Component({
  selector: 'sn-run-set-statistic-compare',
  templateUrl: './run-set-statistic-compare.component.html',
  styleUrls: ['./run-set-statistic-compare.component.scss']
})
export class RunSetStatisticCompareComponent implements OnInit {

  originId: string;
  destId: string;
  basic = {field:"",pass:0,fail:0,error:0,skip:0,missing:0,total:0};
  status = ["PASS","FAIL","ERROR","SKIP","MISSING","TOTAL"];
  results:Array<any> = [];

  constructor(private route:ActivatedRoute,private resultService:RunResultService) { }

  ngOnInit() {
    const params = this.route.snapshot.paramMap;
    this.originId = params.get('originId');
    this.destId = params.get('destId');
    this.resultService.getCompareRunResultStatistic(this.originId,this.destId).subscribe(data =>{
      for(let sta of this.status){
        const result = data.resultList.filter(row =>{
          return row.field == sta;
        });
        this.basic.field = sta;
        let element = this.basic;
        if(result){
          element = Object.assign({},element,result[0]);
        }
        this.results.push(element);
      }
    });
  }

}
