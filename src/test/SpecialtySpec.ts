import { Specialty } from '../lib/Specialty';
import {expect} from 'chai';

describe('Specialty', function() {
    it('should load all specialties from ../../config/specialties.json', function() {
        let specialty = Specialty.byCode('NEURO');
        expect(specialty.code).to.eq('NEURO');
    })
});