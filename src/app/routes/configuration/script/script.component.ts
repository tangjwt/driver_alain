import { Component, OnInit } from '@angular/core';
import { STColumn } from '@delon/abc';
import { STPage } from '@delon/abc';
import { ScriptManageService } from '../../../services/script-manage.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {  NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'sn-script',
  templateUrl: './script.component.html',
  styleUrls: ['./script.component.scss']
})
export class ScriptComponent implements OnInit {

  constructor(
    private scriptService: ScriptManageService,
    private message: NzMessageService,
    private fb: FormBuilder
    ) { }
    page: STPage = {
      show: true,
      showSize: true
    };
  scriptList: Array<any>;

  columns = [{
    title: 'id',
    index: 'id'
  }, {
    title: 'name',
    index: 'name',
  },{
    title: 'type',
    index: 'type',
  },{
    title: 'description',
    index: 'description'
  },{
    title: 'operation',
    buttons: [
      {
        text: 'Edit',
        icon: 'edit',
        click: (record: any) =>{
          this.getScript(record.id)
        }
      },
      {
        text: 'delete',
        icon: 'delete',
        type: 'del',
        click: (record) => {
          this.delete(record.id);
          this.message.success(`成功删除【${record.name}】`);
        }
      }
    ]
  }
  ];


  scriptType = ['PYTHON', 'SHELL', 'TEMPLATE'];

  scriptFG: FormGroup = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    type: ['', Validators.required],
    content: ['', Validators.required],
    description: ['']
  });
  isVisible = false;
  isOkLoading = false;

  ngOnInit() {
    this.scriptService.getScriptList().subscribe(data => {
      this.scriptList = data.resultList ? data.resultList : [];
    });
  }

  show() {
    this.scriptFG.reset();
    this.isVisible = true;
  }

  handleCancel() {
    this.isVisible = false;
    // this.init();
    // this.tagsFG.reset();
  }

  handleOk(value: any){
    this.isOkLoading = true;
    this.scriptService.addOrModify(value).toPromise().then(data =>{
      if ( data.status == 'STATUS_SUCCESS' ) {
          this.isOkLoading = false;
          this.ngOnInit();
          this.isVisible = false;
          this.message.success('添加/修改script成功');
          this.ngOnInit();
      } else {
        this.isOkLoading = false;
        this.isVisible = true;
        this.message.error(data.errorMessage, {
          nzDuration: 5000
        });
      }
    });
  }


  getScript(id: string){
    this.scriptService.getScriptById(id).subscribe(data => {
      if( data.resultList.length > 0) {
        this.scriptFG.setValue({
          id: data.resultList[0].id,
          name: data.resultList[0].name,
          type: data.resultList[0].type,
          content: data.resultList[0]. content,
          description: data.resultList[0].description ? data.resultList[0].description : ''
        });

        this.isVisible = true;
      }
    });
  }



  delete(id: any) {
    this.scriptService.deleteScriptById(id).subscribe(data => {
      this.ngOnInit();
    });
  }


}
