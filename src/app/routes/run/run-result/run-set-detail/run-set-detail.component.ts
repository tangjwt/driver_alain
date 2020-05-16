import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RunResultService } from '../../../../services/run-result.service';
import { CaseFilepathService } from '../../../../services/case-filepath.service';
@Component({
  selector: 'sn-run-set-detail',
  templateUrl: './run-set-detail.component.html',
  styleUrls: ['./run-set-detail.component.less']
})
export class RunSetDetailComponent implements OnInit {

  detail:any;
  remoteParameter:string;
  @Input() id;


  constructor(private runResultService:RunResultService, private filepathService:CaseFilepathService) { }

  ngOnInit() {

    this.runResultService.getRunsetById(this.id).subscribe(data => {
      if (data.data.length > 0) {
        this.detail = data.data[0];
        if(this.detail.launchParam){
          this.detail.launchParam = JSON.parse(this.detail.launchParam);
          if(this.detail.launchParam.remoteParameter){
            this.remoteParameter = this.detail.launchParam.remoteParameter;
            this.detail.launchParam.remove('remoteParameter')
          }
        }
        // this.detail = JSON.stringify(data.data[0], null, "   ");
      }
    });
  }
 
}
