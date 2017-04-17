import { Task } from '../lib/Task';
import {expect} from 'chai';

describe('Task', function() {
    it('should load all tasks from ../../config/tasks.json', function() {
        let task = Task.byCode('NEURO');
        expect(task.code).to.eq('NEURO');
    })
});