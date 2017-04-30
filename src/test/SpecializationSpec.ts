import { Specialization } from '../lib/Specialization';
import {expect} from 'chai';

describe.only('Specialization', function() {
    it('should load all tasks from ../../config/tasks.json', function() {
        // let task = Specialization.byCode('NEURO');
        // expect(task.code).to.eq('NEURO');
        new Specialization();
    })
});