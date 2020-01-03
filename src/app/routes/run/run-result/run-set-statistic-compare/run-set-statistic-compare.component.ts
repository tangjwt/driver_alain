import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,ParamMap} from '@angular/router';
import { RunResultService } from '../../../../services/run-result.service';
import { STPage, STColumn } from '@delon/abc';
@Component({
  selector: 'sn-run-set-statistic-compare',
  templateUrl: './run-set-statistic-compare.component.html',
  styleUrls: ['./run-set-statistic-compare.component.scss']
})
export class RunSetStatisticCompareComponent implements OnInit {

  originId: string;
  destId: string;
  page: STPage = {
    show: false
  };
  columns: STColumn[] = [
    {
      title: `主运行(id:${this.route.snapshot.paramMap.get('originId')})`,
      index: 'field',
      type:'tag',
      tag:{
        PASS:{text : 'PASS', color: 'green'},
        ERROR:{text : 'ERROR', color: 'red'},
        FAIL:{text : 'FAIL', color: 'red'},
        SKIP:{text : 'SKIP', color: 'gold'},
        MISSING:{text : 'MISSING', color: 'gold'},
        TOTAL:{text : 'TOTAL', color: 'geekblue'},
      }
    },
    {
      title: 'PASS',
      index: 'pass',
      type: 'link',
      click: row => this.router.navigate(['/run/result', this.originId,row.field,this.destId,'PASS','cases'])
    },
    {
      title: 'FAIL',
      index: 'fail',
      type: 'link',
      click: row => this.router.navigate(['/run/result', this.originId,row.field,this.destId,'FAIL','cases'])
    },
    {
      title: 'ERROR',
      index: 'error',
      type: 'link',
      click: row => this.router.navigate(['/run/result', this.originId,row.field,this.destId,'ERROR','cases'])
    },
    {
      title: 'SKIP',
      index: 'skip',
      type: 'link',
      click: row => this.router.navigate(['/run/result', this.originId,row.field,this.destId,'SKIP','cases'])
    },
    {
      title: 'MISSING',
      index: 'missing',
      type: 'link',
      click: row => this.router.navigate(['/run/result', this.originId,row.field,this.destId,'MISSING','cases'])
    },
    {
      title: 'TOTAL',
      index: 'total',
      type: 'link',
      click: row => this.router.navigate(['/run/result', this.originId,row.field,this.destId,'TOTAL','cases'])
    },
  ];
  basic = {field:"",pass:0,fail:0,error:0,skip:0,missing:0,total:0};
  status = ["PASS","FAIL","ERROR","SKIP","MISSING","TOTAL"];
  results:Array<any> = [];

  constructor(private route: ActivatedRoute, private router: Router, private resultService:RunResultService) { }

  ngOnInit() {
    const params = this.route.snapshot.paramMap;
    this.originId = params.get('originId');
    this.destId = params.get('destId');
    this.resultService.getCompareRunResultStatistic(this.originId,this.destId).subscribe(data =>{
      let tmp:Array<any> = [];
      for(let sta of this.status){
        const result = data.data.filter(row =>{
          return row.field == sta;
        });
        this.basic.field = sta;
        let element = this.basic;
        if(result){
          element = Object.assign({},element,result[0]);
        }
        tmp.push(element);
      }
      this.results = tmp;
    });
  }

}
