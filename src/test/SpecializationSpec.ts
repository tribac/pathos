import { Specialization } from '../lib/Specialization';
import {expect} from 'chai';

describe.only('Specialization', function() {
    it('should load all specialties from ../../config/specialties.json', function() {
        // let specialty = Specialization.byCode('NEURO');
        // expect(specialty.code).to.eq('NEURO');
        new Specialization();
    })
});