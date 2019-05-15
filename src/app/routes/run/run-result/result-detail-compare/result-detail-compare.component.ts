import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RunResultService } from '../../../../services/run-result.service';

@Component({
  selector: 'sn-result-detail-compare',
  templateUrl: './result-detail-compare.component.html'
})
export class ResultDetailCompareComponent implements OnInit {

  constructor(private route:ActivatedRoute,private resultService:RunResultService) { }

  detail1:any;
  detail2:any;

  ngOnInit() {
    let params = this.route.snapshot.params;
    this.resultService.getRunResultDetail(params.originId).subscribe(data=>{
      this.detail1 = data.resultList[0];
    });
    
    this.resultService.getRunResultDetail(params.destId).subscribe(data=>{
      this.detail2 = data.resultList[0];
    }); 
  }

}
