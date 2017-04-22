import { Specialty } from '../lib/Specialty';
import { Task } from '../lib/Task';
import * as bunyan from 'bunyan';

const logger = bunyan.createLogger({name: 'ScheduleSpec', level: 'debug'});

describe.only('ScheduleSpec', function() {
    it('Number of pathologists by task', function() {
        Task.allNames().forEach(function(name) {
            let task = Task.byName(name);
            logger.info(name, task.pathologists);
        });
    });
});