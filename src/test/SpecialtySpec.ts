import { Specialty } from '../lib/Specialty';
import {expect} from 'chai';

describe.only('Specialty', function() {
    it('should load all tasks from ../../config/tasks.json', function() {
        // let task = Specialty.byCode('NEURO');
        // expect(task.code).to.eq('NEURO');
        new Specialty();
    })
});