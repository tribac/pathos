import { Specialization } from '../lib/Specialization';
import { Specialty } from '../lib/Specialty';
import * as bunyan from 'bunyan';

const logger = bunyan.createLogger({name: 'ScheduleSpec', level: 'debug'});

describe('ScheduleSpec', function() {
    it('Number of specialists by specialty', function() {
        Specialty.allNames().forEach(function(name) {
            let specialty = Specialty.byName(name);
            logger.info(name, specialty.specialists);
        });
    });
});