import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SFSchema } from '@delon/form';
import { AutocompleteService } from '../../../services/autocomplete.service';
import { EnvUrlManageService } from '../../../services/env-url-manage.service';
import { isArray } from 'util';

@Component({
  selector: 'sn-generate-content',
  templateUrl: './generate-content.component.html',
  styleUrls: ['./generate-content.component.less'],
})
export class GenerateContentComponent implements OnInit {
  _serviceName = '';
  _projectName = '';
  env: string;
  envs: Array<any> = new Array();
  envUrls: Array<any>;
  showDefault = false;
  showBasic = false;
  repeat = [];
  repeatSelect = [];

  @Input() set extend(extend: any) {
    if (extend) {
      let extendFieldSchema: SFSchema = {
        properties: {
          header: {
            type: 'string',
            ui: {
              widget: 'textarea',
              autosize: { minRows: 2, maxRows: 6 },
              placeholder: '格式为 key: value ，多个值使用换行符分隔',
            },
          },
          extend: {
            type: 'string',
            title: '扩展字段',
            ui: {
              widget: 'textarea',
              autosize: { minRows: 2, maxRows: 6 },
              placeholder: '格式为 key = value ，多个值使用换行符分隔',
            },
          },
        },
        ui: {
          spanLabelFixed: 100,
          grid: {
            span: 8,
          },
        },
      };
      if (extend.cookies && extend.cookies.length > 0) {
        extendFieldSchema.properties.use_cookie = {
          type: 'string',
          title: 'use_cookie',
          enum: extend.cookies,
          ui: {
            widget: 'select',
            allowClear: true,
          },
        };
        this.extendFieldSchema = extendFieldSchema;
      }
    }
  }
  @Input() set projectName(projectName: string) {
    if (!projectName) {
      return;
    }
    this._projectName = projectName;
    this.envUrlService.getEnvUrlListByProject(projectName).subscribe(result => {
      let envSchema: SFSchema = {
        properties: {},
        ui: {
          spanLabelFixed: 100,
          grid: {
            span: 12,
          },
        },
      };
      let options = [];
      this.envUrls = result.resultList.filter(data => {
        if (data.serviceName == this._serviceName) {
          this.envs.push(data.envName);
          options.push({ label: data.envName, value: data.envName });
          return true;
        } else {
          return false;
        }
      });
      envSchema.properties.env = {
        type: 'string',
        title: '环境',
        enum: options,
        default: this.envs[0],
        ui: {
          widget: 'select',
          grid: {
            span: 6,
          },
          change: value => {
            this.updateService(value);
          },
        },
      };
      envSchema.properties.url = {
        type: 'string',
        title: 'URL',
        ui: {
          grid: {
            span: 18,
          },
        },
      };
      this.updateService(this.envs[0]);
      this.envSchema = envSchema;
    });
  }
  envParam: any = {};
  @Input() set serviceName(serviceName: string) {
    if (!serviceName) {
      return;
    }
    this._serviceName = serviceName;
    const fieldS: SFSchema = {
      properties: {},
      ui: {
        spanLabelFixed: 150,
        grid: {
          span: 8,
        },
      },
    };
    const defaultFieldS: SFSchema = {
      properties: {},
      ui: {
        spanLabelFixed: 150,
        grid: {
          span: 8,
        },
      },
    };
    const required = [];
    const defaultRequired = [];
    this.auto.getFieldsByService(serviceName).subscribe(data => {
      if (!data.resultList) {
        return;
      }
      data.resultList.forEach(field => {
        if (field.value) {
          this.showDefault = true;
          // defaultFieldS.properties[field.name] = { type: 'string' };
          // if (field.description) {
          //   defaultFieldS.properties[field.name].ui = {
          //     placeholder: field.description,
          //   };
          // }
          this.fieldConfig(defaultFieldS, field, defaultRequired);
          this.params[field.name] = field.value;
        } else {
          this.showBasic = true;
          // fieldS.properties[field.name] = { type: 'string' };
          // if (field.description) {
          //   fieldS.properties[field.name].ui = {
          //     placeholder: field.description,
          //   };
          // }
          this.fieldConfig(fieldS, field, required);
        }
      });
      fieldS.required = required;
      defaultFieldS.required = defaultRequired;
      this.fieldSchema = fieldS;
      this.defaultFieldSchema = defaultFieldS;
    });
  }

  @Output() valueChange: EventEmitter<any> = new EventEmitter();
  params: any = {};
  fieldSchema: SFSchema = {
    properties: {},
    ui: {
      spanLabelFixed: 100,
      grid: {
        span: 8,
      },
    },
  };
  defaultFieldSchema: SFSchema = {};

  extendFieldSchema: SFSchema = {
    properties: {
      header: {
        type: 'string',
        ui: {
          widget: 'textarea',
          autosize: { minRows: 2, maxRows: 6 },
          placeholder: '格式为 key: value ，多个值使用换行符分隔',
        },
      },
      extend: {
        type: 'string',
        title: '扩展字段',
        ui: {
          widget: 'textarea',
          autosize: { minRows: 2, maxRows: 6 },
          placeholder: '格式为 key = value ，多个值使用换行符分隔',
        },
      },
    },
    ui: {
      spanLabelFixed: 100,
      grid: {
        span: 8,
      },
    },
  };
  envSchema: SFSchema;
  sfEnvRequest = '';
  sfRequest = '';
  sfExtendRequest = '';
  sfDefaultRequest = '';
  constructor(
    private auto: AutocompleteService,
    private envUrlService: EnvUrlManageService,
  ) {}

  ngOnInit() {}

  fieldConfig(fieldS: SFSchema, field: any, required: Array<any>) {
    fieldS.properties[field.name] = { type: 'string' };
    fieldS.properties[field.name].ui = {};
    if (field.required && field.required === 'true') {
      required.push(field.name);
    }
    if (field.required && field.required === 'true') {
      required.push(field.name);
    }
    let placeholder = '';
    if (field.allowableValues) {
      fieldS.properties[field.name].default = null;
      fieldS.properties[field.name].enum = this.split(field.allowableValues);
      fieldS.properties[field.name].ui['widget'] = 'select';
      fieldS.properties[field.name].ui['allowClear'] = true;
      fieldS.properties[field.name].ui['mode'] = 'tags';
      fieldS.properties[field.name].ui['maxTagCount'] = 2;
      if (!field.repeatable || field.repeatable === 'false') {
        fieldS.properties[field.name].ui['maxMultipleCount'] = 1;
        this.repeatSelect.push(field.name);
      }
    } else if (field.repeatable && field.repeatable === 'true') {
      fieldS.properties[field.name].ui['widget'] = 'textarea';
      fieldS.properties[field.name].ui['autosize'] = { minRows: 2, maxRows: 6 };
      this.repeat.push(field.name);
      placeholder += '\n多个值使用换行符分隔';
    }
    if (field.description) {
      placeholder = field.description + placeholder;
    }
    fieldS.properties[field.name].ui['placeholder'] = placeholder;
  }

  split(value: string): Array<any> {
    const separator = ['\t', '-', ' ', ':', ';'];
    const result = [];
    value.split(',').forEach(data => {
      separator.some((sep, index) => {
        const r = data.trim().split(sep, 2);
        if (r.length === 2) {
          result.push({
            label: r[1].trim(),
            value: r[0].trim(),
          });
          return true;
        } else if (index === separator.length - 1) {
          result.push({
            label: r[0].trim(),
            value: r[0].trim(),
          });
          return true;
        }
        return false;
      });
    });
    return result;
  }

  generate(event: any) {
    let request = '';
    for (const key in event) {
      if (event.hasOwnProperty(key)) {
        const elements = event[key];
        let resultArray = [];
        if (!isArray(elements)) {
          resultArray = elements.split('\n').filter(data => data.trim());
          if (resultArray.length === 0) {
            resultArray = elements.split('\n'); // 若过滤完之后，数组为空，则不过滤
          }
        }
        resultArray.forEach(element => {
          request += '__' + key + '__ = ';
          if (element.indexOf('"') > -1) {
            request += "'" + element + "'\n";
          } else {
            request += '"' + element + '"\n';
          }
        });
      }
    }
    return request;
  }

  formChangeSf(event) {
    this.sfRequest = this.generate(event);
    this.valueChange.emit(
      this.sfEnvRequest +
        this.sfRequest +
        this.sfDefaultRequest +
        this.sfExtendRequest,
    );
  }

  formChangeSfDefault(event) {
    this.sfDefaultRequest = this.generate(event);
    this.valueChange.emit(
      this.sfEnvRequest +
        this.sfRequest +
        this.sfDefaultRequest +
        this.sfExtendRequest,
    );
  }

  formChangeExtend(event) {
    this.sfExtendRequest = '';
    if (event.use_cookie) {
      this.sfExtendRequest += `__use_cookie__ = "${event.use_cookie.trim()}"\n`;
    }
    if (event.header) {
      event.header.split('\n').forEach(element => {
        this.sfExtendRequest += `__header__ = "${element.trim()}"\n`;
      });
    }
    if (event.extend) {
      event.extend.split('\n').forEach(element => {
        element.split('=', 2);
        this.sfExtendRequest += `__${element[0].trim()}__ = "${element[1].trim()}"\n`;
      });
    }
    this.valueChange.emit(
      this.sfEnvRequest +
        this.sfRequest +
        this.sfDefaultRequest +
        this.sfExtendRequest,
    );
  }

  formChangeEnv(event) {
    this.sfEnvRequest = '__project__ = "' + this._projectName + '"\n';
    this.sfEnvRequest += '__service__ = "' + this._serviceName + '"\n';
    this.sfEnvRequest += '__run_url__ = "' + event.url + '"\n';
    this.valueChange.emit(
      this.sfEnvRequest +
        this.sfRequest +
        this.sfDefaultRequest +
        this.sfExtendRequest,
    );
  }

  updateService(event: any) {
    if (this.envUrls.length > 0) {
      let param = { url: '', env: event };
      param.url = this.envUrls.filter(data => {
        return data.envName === event;
      })[0].serviceUrl;
      this.envParam = param;
    }
  }
}
