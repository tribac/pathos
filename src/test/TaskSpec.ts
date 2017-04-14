import { Task } from '../lib/Task';
import * as chai from 'chai';
const expect = chai.expect;
describe('Task', function() {
    it('should load all tasks from ../../config/tasks.json', function() {
        let task = Task.byCode('NEURO');
        expect(task.code).to.eq('NEURO');
    })
});