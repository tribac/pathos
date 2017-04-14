import 'mocha';
import * as chai from 'chai';
import { Name } from '../src/Name';

const expect = chai.expect;

describe('Name', function() {
    let testable: Name;
    it('should produce initials "TG" for givenName: "Theo" familyName: "Galavan"', function() {
        testable = new Name('Theo', 'Galavan');
        expect(testable.initials).to.eq('TG');
    });
    it('should produce initials "JJWA" for givenName "Joe Jack" and familyName: "William Averell"', function() {
        testable = new Name('Joe Jack', 'William Averell');
        expect(testable.initials).to.eq('JJWA');
    });
});