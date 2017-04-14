import { Pathologist } from '../lib/Pathologist';
import * as chai from 'chai';
const expect = chai.expect;
describe('Pathologist', function() {
    before(function() {
    });
    it('should load all pathologists from "config/pathlogists.json"', function() {
        console.log(Pathologist.byInitials('BN'));
        expect(Pathologist.byInitials('BN')).to.eq({name: {given: 'Bich', family: 'Nguyen'}})
    });
});