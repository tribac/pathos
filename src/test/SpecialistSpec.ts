import {expect} from 'chai';
import { PersonName } from '../lib/PersonName';
import { Specialist } from "../lib/Specialist";

describe('Specialist', function() {
    before(function() {
    });
    it.skip('should load "../../config/specialists.json"', function() {
        let all: Specialist[] = require('../../config/specialists.json');
        console.log(JSON.stringify(all));
        console.log(all[0].name);
    });
    it('byInitials', function() {
        // console.log(Specialist.byInitials('BN'));
        expect(Specialist.byInitials('BN').name.initials).to.eq('BN');
    });
    it('should return all Specialists by initials', function() {
        // console.log(Specialist.byInitials('BN'));
        expect(Specialist.all().length).to.eq(Object.keys(Specialist.allByInitials()).length);
    });
});