import { PersonName } from './PersonName';
import * as bunyan from 'bunyan';

const byInitials: {[initials: string]: Pathologist} = {};

const logger = bunyan.createLogger({name: 'Pathologist', level: 'debug'});

export class Pathologist {

    public static byInitials(initials: string): Pathologist {
        return byInitials[initials];
    }

    public static allInitials(): string[] {
        return Object.keys(byInitials);
    }

    constructor(public name: PersonName) {
    }
}

require('../../config/pathologists.json').forEach(item => {
    let pathologist = new Pathologist(new PersonName(item.name.given, item.name.family));
    logger.debug(pathologist.name.initials);
    byInitials[pathologist.name.initials] = pathologist;
});

logger.info('loaded pathologists', Pathologist.allInitials().sort());
