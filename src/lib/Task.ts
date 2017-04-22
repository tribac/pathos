import * as bunyan from 'bunyan';

const byCode: {[code: string]: Task} = {};
const byName: {[name: string]: Task} = {};

export class Task {
    public static byCode(code: string): Task {
        return byCode[code];
    }

    public static allCodes(): string[] {
        return Object.keys(byCode);
    }

    public static byName(name: string): Task {
        return byName[name];
    }

    public static allNames(): string[] {
        return Object.keys(byName);
    }

    public pathologists: string[] = [];

    constructor(public name: string,
                public code: string,
                public weight: number,
                public startTime: number,
                public endTime: number) {
    }
}

const logger = bunyan.createLogger({name: 'Task', level: 'debug'});

require('../../config/tasks.json').forEach(item => {
    let task = new Task(item.name, item.code, item.weight, item.startTime, item.endTime);
    // logger.debug(task);
    byCode[task.code] = task;
    byName[task.name] = task;
});;

logger.info('loaded tasks', Task.allCodes().length, Task.allNames().length);
