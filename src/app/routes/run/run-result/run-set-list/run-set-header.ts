
import { STColumn } from '@delon/abc';

export const HEADER: STColumn[] = [
  {
    title: 'compare',
    index: 'id',
    type: 'checkbox'
  },
  {
    title: 'id',
    index: 'id'
  },
  {
    title: 'project',
    index: 'project'
  },
  {
    title: 'env',
    index: 'env'
  },
  {
    title: 'service',
    index: 'service'
  },
  {
    title: 'url',
    index: 'runUrl',
    width: '50px'
  },
  {
    title: 'dataSource',
    index: 'dataSource'
  },
  {
    title: 'succesed',
    renderTitle: 'succesedTitle',
    render: 'succesed'
  },
  {
    title: 'status',
    index: 'status',
    type: 'tag',
    tag: {
      FINISHED : {text : 'FINISHED', color: 'green'},
      ERROR: { text: 'ERROR', color: 'red' },
      FAIL: { text: 'FAIL', color: 'red' },
      RUNNING: { text: 'RUNNING', color: 'blue' },
      CANCELED: { text: 'CANCELED', color: 'orange' }
    }
  },
  {
    title: 'pass',
    index: 'isPass',
    hide: true
  },
  {
    title: 'runTime',
    index: 'runTime',
    type: 'date',
    className: 'text-nowrap',
  },
  {
    title: 'runnedPercent',
    renderTitle: 'runnedPercentTitle',
    render: 'runnedPercent'
  },
  {
    title: 'operation',
    buttons:[
      {
        text: 'Detail',
        type: 'link',
        click: (record: any) =>{
        }
      }
    ]
  }
];