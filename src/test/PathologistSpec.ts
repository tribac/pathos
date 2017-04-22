import { Pathologist } from '../lib/Pathologist';
import {expect} from 'chai';
import { PersonName } from '../lib/PersonName';

describe('Pathologist', function() {
    before(function() {
    });
    it.skip('should load "../../config/pathlogists.json"', function() {
        let all: Pathologist[] = require('../../config/pathologists.json');
        console.log(JSON.stringify(all));
        console.log(all[0].name);
    });
    it('byInitials', function() {
        // console.log(Pathologist.byInitials('BN'));
        expect(Pathologist.byInitials('BN').name.initials).to.eq('BN');
    });
    it('should return all pathologists by initials', function() {
        // console.log(Pathologist.byInitials('BN'));
        expect(Pathologist.all().length).to.eq(Object.keys(Pathologist.allByInitials()).length);
    });
});