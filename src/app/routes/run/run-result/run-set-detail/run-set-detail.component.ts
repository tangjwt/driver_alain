import { Component, OnInit, Input } from '@angular/core';
import { RunResultService } from '../../../../services/run-result.service';
@Component({
  selector: 'sn-run-set-detail',
  templateUrl: './run-set-detail.component.html',
  styleUrls: ['./run-set-detail.component.less']
})
export class RunSetDetailComponent implements OnInit {

  detail:any;
  remoteParameter:string;
  @Input() id;


  constructor(private runResultService:RunResultService) { }

  ngOnInit() {

    this.runResultService.getRunsetById(this.id).subscribe(data => {
      if (data.data) {
        this.detail = data.data
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
