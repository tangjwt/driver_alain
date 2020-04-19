import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ChangeDetectorRef,
  ElementRef,
} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RunResultService } from '../../../../services/run-result.service';
import { STColumn } from '@delon/abc';

@Component({
  selector: 'sn-result-detail',
  templateUrl: './result-detail.component.html',
  styleUrls: ['./result-detail.component.less'],
})
export class ResultDetailComponent implements OnInit {
  columns: STColumn[] = [
    {
      title: 'id',
      render: 'id',
    },
    {
      title: 'name',
      index: 'caseName',
    },
    {
      title: 'serviceName',
      index: 'serviceName',
    },
    {
      title: 'caseType',
      index: 'caseType',
    },
  ];
  @Input() set detail(detail: any) {
    if (detail) {
      this.details = detail;
      if (this.details.errorLine) {
        const str: string[] = this.details.errorLine.split(';');
        this.errorLine = str[0];
        this.addtionalErrorLine = str[1];
      } else {
        this.errorLine = '';
        this.addtionalErrorLine = '';
      }
      if (this.details.subCases) {
        this.subCaseDetail = detail.subCases;
        const subCaseShow = [];
        for (let index = 0; index < this.subCaseDetail.length; index++) {
          subCaseShow.push(false);
        }
        this.subCaseShow = subCaseShow;
      }
      // 高亮的错误行，不会自动更新页面，使用这种比较trick的方式来使组件重新render
      if (this.showDetail) {
        this.showDetail = false;
        this.cdr.detectChanges();
        this.showDetail = true;
      }
      if (typeof this.currentSelect !== 'undefined') {
        this.showTab(this.currentSelect);
      }
    }
  }
  details: any;
  subCaseDetail: Array<any>; // 测试用例debug的时候，会存在。
  subCaseShow: Array<any> = [];
  @Input() debugView = false;
  @Input() generateView = false;
  @Input() showTitle = true;
  subCase: Array<any>;
  mode = 'javascript';
  options: any = {
    lineNumbers: true,
    mode: this.mode,
    foldGutter: true,
    nocursor: true,
    readOnly: true,
    lineWrapping: false,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
  };
  showSummary = true;
  showDetail = true;
  showRequest = false;
  showResponse = false;
  showJsonResponse = false;
  errorLine: string;
  addtionalErrorLine: string;
  currentSelect;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private runResultService: RunResultService,
    private cdr: ChangeDetectorRef,
  ) {}
  cardView = {
    caseDetail: true,
    requestHeader: true,
    responseHeader: true,
    message: true,
  };
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('id') && !this.debugView) {
        const id = params.get('id');
        this.runResultService.getRunResultDetail(id).subscribe(data => {
          if (data.data) {
            this.details = data.data;
            if (this.details.errorLine) {
              const str: string[] = this.details.errorLine.split(';');
              this.errorLine = str[0];
              this.addtionalErrorLine = str[1];
            }
            if (this.details.compareId) {
              if (params.has('status')) {
                const status = params.get('status');
                window.history.pushState(
                  {},
                  'List',
                  `/run/result/${this.details.runSetId}/cases;status=${status}`,
                );
              } else {
                window.history.pushState(
                  {},
                  'List',
                  `/run/result/${this.details.runSetId}/cases`,
                );
              }
              this.router.navigate([
                `/run/result/casedetail/${id}/${this.details.compareId}`,
              ]);
            }
            // 显示图片
            // if(this.details.response && this.details.response.startsWith('<img')){
            //     this.dataContainer.nativeElement.innerHTML = this.details.response;
            // }
          }
        });
        this.runResultService.getSubRundata(id).subscribe(data => {
          this.subCase = data.data;
        });
      }
    });
    // snapshot 只适用于页面不会更新的情况，如果有：A页面，存在链接，再跳转到A页面这种情况， 会导致页面不刷新
    // let id = this.route.snapshot.params.id;
    // this.runResultService.getRunResultDetail(id).subscribe(data => {
    //   if(data.data.length >0){
    //     this.details = data.data[0];
    //   }
    // });
    // this.runResultService.getSubRundata(id).subscribe(data => {
    //   this.sutCase = data.data;
    // }
    // );
  }

  showTab(type) {
    this.currentSelect = type;
    for (let index = 0; index < this.subCaseShow.length; index++) {
      this.subCaseShow[index] = false;
    }
    switch (type) {
      case 'detail':
        this.showDetail = true;
        this.showRequest = false;
        this.showResponse = false;
        this.showJsonResponse = false;
        break;
      case 'request':
        this.showDetail = false;
        this.showRequest = true;
        this.showResponse = false;
        this.showJsonResponse = false;
        break;
      case 'response':
        this.showDetail = false;
        this.showRequest = false;
        this.showResponse = true;
        this.showJsonResponse = false;
        break;
      case 'json':
        this.showDetail = false;
        this.showRequest = false;
        this.showResponse = false;
        this.showJsonResponse = true;
        break;

      default:
        this.showDetail = false;
        this.showRequest = false;
        this.showResponse = false;
        this.showJsonResponse = false;
        this.subCaseShow[type] = true;
        break;
    }
  }
}
