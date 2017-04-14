import 'mocha';
import * as chai from 'chai';
import { PersonName } from '../lib/PersonName';

const expect = chai.expect;

describe('PersonName', function() {
    let testable: PersonName;
    it('should produce initials "TG" for given: "Theo" and family: "Galavan"', function() {
        testable = new PersonName('Theo', 'Galavan');
        expect(testable.initials).to.eq('TG');
    });
    it('should produce initials "JJWA" for given: "Joe Jack" and family: "William Averell"', function() {
        testable = new PersonName('Joe Jack', 'William Averell');
        expect(testable.initials).to.eq('JJWA');
    });
});