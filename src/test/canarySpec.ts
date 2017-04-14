import 'mocha';
import * as chai from 'chai';

const expect = chai.expect;

describe('canary', function() {
    it('should pass', function() {
        expect(true).to.eql(true);
    });
});