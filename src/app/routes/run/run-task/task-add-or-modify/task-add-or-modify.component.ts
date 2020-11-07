import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TaskManageService } from '../../../../services/task-manage.service';
import { Convert } from '../../../../services/convert';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'sn-task-add-or-modify',
  templateUrl: './task-add-or-modify.component.html',
})
export class TaskAddOrModifyComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private taskService: TaskManageService,
    private message: NzMessageService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  advanceIsCollapsed: boolean;
  runEntityValue;
  runEntity: FormGroup = this.fb.group({});

  taskEntity: FormGroup = this.fb.group({
    taskName: ['', [Validators.required]],
    createUser: [''],
    cronExpression: [''],
    sendEmail: ['', [Validators.required]],
    threshold: [''],
    recipient: [''],
    description: [''],
  });

  alarmParam: FormGroup = this.fb.group({
    type: [''],
    mergeAlarm: [false],
    recently: [''],
    percent: [''],
    continuous: [''],
  });
  mergeType = ['and', 'or'];

  list = [
    'ALWAYS',
    'NEVER',
    'LESS_THAN',
    'WHEN_HAS_FAILED',
    'WHEN_HAS_REGRESSION',
    'BY_PRIORITY',
  ];
  priorityList = [
    { name: 'P0', value: '' },
    { name: 'P1', value: '' },
    { name: 'P2', value: '' },
    { name: 'P4', value: '' },
  ];
  task: any = {};
  alarm: any = {};
  detail: any = {};
  isTaskAdd = true;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('id') && params.get('id')) {
        this.isTaskAdd = false;
        let id = params.get('id');
        this.taskService.getTaskById(id).subscribe(data => {
            this.task = data.data;
            this.detail = this.task.detail;
            if (this.task.sendEmail === 'BY_PRIORITY' && this.task.threshold) {
              this.task.threshold.split(';').forEach(element => {
                if (element) {
                  let ele = element.split(',');
                  this.priorityList.find(data => data.name == ele[0]).value =
                    ele[1];
                }
              });
              this.task.threshold = '';
            }
            this.taskEntity.reset();
            const taskValue = new Convert().taskToTaskEntity(this.task);
            this.runEntityValue = new Convert().runSetToRunEntity(this.detail);
            if(this.task?.params?.alarmParam){
              this.alarm = new Convert().taskAlarmParamRevert(
                this.task.params?.alarmParam
              );
              this.alarmParam.setValue(this.alarm);
            }
            this.taskEntity.setValue(taskValue);
            // this.runEntity.patchValue(runEntityValue);
            // console.log(this.taskEntity);
            // console.log(this.runEntityValue);
        });
      }
    });
  }

  run(value: any) {
    this.task = new Convert().taskEntityToTask(value, this.task);
    this.alarm = new Convert().taskAlarmParamConvert(this.alarmParam.value);
    console.log(this.alarm);
    this.task.params = {};
    this.task.params.alarmParam = this.alarm;
    this.task.detail = new Convert().runEntityToRunSet(
      this.runEntity.value,
      this.detail,
    );
    delete this.task.quartzTaskName;
    delete this.task.groupName;
    if (this.task.sendEmail === 'BY_PRIORITY') {
      let threshold = '';
      this.priorityList.forEach(element => {
        if (element.value) {
          threshold += element.name + ',' + element.value + ';';
        }
      });
      this.task.threshold = threshold;
    }
    this.taskService.add(this.task).subscribe(data => {
      if (data.status === 'STATUS_SUCCESS') {
        if (this.task.id) {
          this.message.success('修改任务成功');
        } else {
          this.message.success('添加任务成功');
        }
        this.router.navigate(['/run/task']);
      } else {
        this.message.warning(data.message);
      }
    });
  }
  valueChange(event: any) {
    this.runEntity = event;
  }
}
