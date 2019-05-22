export const PriorityOptions = [
  { label: 'P0', value: 'P0', checked: false },
  { label: 'P1', value: 'P1', checked: false },
  { label: 'P2', value: 'P2', checked: false },
  { label: 'P4', value: 'P4', checked: false },
];

export class Convert {
  public runEntityToRunSet(entity: any, runset: any): any {
    runset.project = entity.project;
    runset.env = entity.env;
    runset.service = entity.fuwu;
    runset.runUrl = entity.url;
    runset.dataSource = entity.dataSource;
    runset.compareUrl = entity.compareUrl;
    runset.tag = entity.tag;
    runset.caseFilePath = entity.filePath;
    runset.caseData = entity.data;
    runset.params = entity.parameter;
    if (!entity.launchParam) {
      runset.launchParam = {};
    } else {
      runset.launchParam = JSON.parse(entity.launchParam);
    }
    runset.launchParam.threads = entity.threads;
    runset.launchParam.runBySequence = entity.runBySequence;
    runset.launchParam.delay = entity.delay;
    runset.launchParam.duration = entity.duration;
    runset.launchParam.maxRetries = entity.maxRetries;
    runset.launchParam.retryInterval = entity.retryInterval;
    runset.launchParam.compareConfig = entity.compareConfig;
    runset.launchParam.priority = entity.priority;
    runset.launchParam.remoteParameter = entity.remoteParameter;
    runset.launchParam = JSON.stringify(runset.launchParam);
    return runset;
  }

  public runSetToRunEntity(runSet: any) {
    const dest: any = {};
    dest.project = runSet.project;
    dest.env = runSet.env;
    dest.fuwu = runSet.service;
    dest.url = runSet.runUrl === 'N/A' ? '' : runSet.runUrl;
    dest.dataSource = runSet.dataSource;
    dest.compareUrl = runSet.compareUrl ? runSet.compareUrl : '';
    dest.tag = runSet.tag ? runSet.tag : '';
    dest.filePath = runSet.caseFilePath ? runSet.caseFilePath : '';
    dest.data = runSet.caseData ? runSet.caseData : '';
    dest.parameter = runSet.params ? runSet.params : '';
    if (!runSet.launchParam) runSet.launchParam = {};
    else runSet.launchParam = JSON.parse(runSet.launchParam);
    dest.threads = runSet.launchParam.threads ? runSet.launchParam.threads : '';
    dest.runBySequence = runSet.launchParam.runBySequence
      ? runSet.launchParam.runBySequence
      : false;
    dest.delay = runSet.launchParam.delay ? runSet.launchParam.delay : '';
    dest.duration = runSet.launchParam.duration
      ? runSet.launchParam.duration
      : '';
    dest.priority = runSet.launchParam.priority
      ? runSet.launchParam.priority
      : '';
    dest.remoteParameter = runSet.launchParam.remoteParameter
      ? runSet.launchParam.remoteParameter
      : '';
    dest.maxRetries = runSet.launchParam.maxRetries
      ? runSet.launchParam.maxRetries
      : '';
    dest.retryInterval = runSet.launchParam.retryInterval
      ? runSet.launchParam.retryInterval
      : '';
    dest.compareConfig = runSet.launchParam.compareConfig
      ? runSet.launchParam.compareConfig
      : '';

    return dest;
  }

  public taskToTaskEntity(task: any) {
    const entity: any = {};
    entity.taskName = task.taskName;
    entity.createUser = task.createUser;
    entity.cronExpression = task.cronExpression;
    entity.sendEmail = task.sendEmail;
    entity.threshold = task.threshold;
    entity.recipient = task.recipient;
    entity.description = task.description;
    return entity;
  }

  public taskEntityToTask(taskEntity: any, task: any) {
    task.taskName = taskEntity.taskName;
    task.createUser = taskEntity.createUser;
    task.cronExpression = taskEntity.cronExpression;
    task.sendEmail = taskEntity.sendEmail;
    task.threshold = taskEntity.threshold;
    task.recipient = taskEntity.recipient;
    task.description = taskEntity.description;
    return task;
  }
}
