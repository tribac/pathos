import { Pathologist } from '../lib/Pathologist';
import * as chai from 'chai';
import { PersonName } from '../lib/PersonName';
const expect = chai.expect;
describe('Pathologist', function() {
    before(function() {
    });
    it.skip('should load all pathologists from "../../config/pathlogists.json"', function() {
        let all: Pathologist[] = require('../../config/pathologists.json');
        console.log(JSON.stringify(all));
        console.log(all[0].name);
    });
    it('should load all pathologists from "../../config/pathlogists.json"', function() {
        // console.log(Pathologist.byInitials('BN'));
        expect(Pathologist.byInitials('BN').name.initials).to.eq('BN');
    });
});