import { Component, OnInit } from '@angular/core';
import { TagManageService } from '../../../services/tag-manage.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NzMessageService } from 'ng-zorro-antd/message';
import { STColumn } from '@delon/abc';
import { STPage } from '@delon/abc';

@Component({
  selector: 'sn-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  tags: Array<any>;
  page: STPage = {
    show: true,
    showSize: true
  };

  columns: STColumn[] = [{
    title: 'id',
    index: 'id'
  }, {
    title: 'name',
    index: 'tagKey'
  }, {
    title: 'type',
    index: 'type'
  }, {
    title: 'value',
    index: 'tagValue'
  }, {
    title: 'description',
    index: 'description'
  },
  {
    title: 'operation',
    buttons: [
      {
        text: 'Edit',
        icon: 'edit',
        click: (record: any) => {
          this.getTag(record.id);
        }
      },
      {
        text: 'delete',
        icon: 'delete',
        type: 'del',
        click: (record) => {
          this.delete(record.id);
          this.message.success(`成功删除【${record.tagKey}】`);
        }
      }
    ]
  }
  ];

  tagType = ['', 'VARIABLE', 'CLASS'];
  node = [];
  tagsFG: FormGroup = this.fb.group({
    id: '',
    tagKey: ['', Validators.required],
    type: '',
    tagValue: ['', Validators.required],
    description: ''
  });
  isVisible = false;
  isOkLoading = false;

  autoTips: Record<string, Record<string, string>> = {
    'zh-cn': {
      required: '必填项',
    },
    en: {
      required: 'Input is required',
    }
  };
  constructor(
    private tagService: TagManageService,
    private message: NzMessageService,
    private fb: FormBuilder
    ) { }

  ngOnInit() {
    this.tagService.getTagsList().subscribe(data => {
      this.tags = data.data ? data.data : [];
    });
  }


  getTag(id: string) {
    this.tagsFG.reset();
    this.tagService.getTagsById(id).subscribe(data => {
      if (data.data.length > 0) {
        this.tagsFG.setValue({
          id: data.data[0].id,
          tagKey: data.data[0].tagKey,
          type: data.data[0].type ? data.data[0].type : '',
          tagValue: data.data[0]. tagValue,
          description: data.data[0].description ? data.data[0].description : ''
        });

        this.isVisible = true;
      }
    });
  }

  show() {
    this.tagsFG.reset();
    this.isVisible = true;
  }

  handleCancel(){
    this.isVisible = false;
    this.tagsFG.reset();
    // this.init();
    // this.tagsFG.reset();
  }

  handleOk(value: any){
    this.isOkLoading = true;
    this.tagService.addOrModify(value).toPromise().then(data => {
      if ( data.status == 'STATUS_SUCCESS' ) {
          this.isOkLoading = false;
          this.ngOnInit();
          this.isVisible = false;
          this.message.success('添加/修改tags成功');
          this.ngOnInit();
      } else {
        this.isOkLoading = false;
        this.isVisible = true;
        this.message.error(data.message, {
          nzDuration: 5000
        });
      }
    });
  }

  delete(id: any) {
    this.tagService.deleteTagsById(id).subscribe(data => {
      this.ngOnInit();
    });
  }


}
