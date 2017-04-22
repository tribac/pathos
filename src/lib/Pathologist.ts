import { PersonName } from './PersonName';
import * as bunyan from 'bunyan';

export type ByInitials = {[initials: string]: Pathologist};

const byInitials: ByInitials = {};

const logger = bunyan.createLogger({name: 'Pathologist', level: 'debug'});

// declare function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K>;

export class Pathologist {

    public static allByInitials(): ByInitials {
        // return pick(byInitials, ...Object.keys(byInitials));
        let result: ByInitials = {};
        Object.keys(byInitials).forEach(function(initials) {
            result[initials] = byInitials[initials];
        });
        return result;
    }

    public static byInitials(initials: string): Pathologist {
        return byInitials[initials];
    }

    public static allInitials(): string[] {
        return Object.keys(byInitials);
    }

    public static all(): Pathologist[] {
        let result: Pathologist[] = [];
        Object.keys(byInitials).forEach(function(initials) {
            result.push(byInitials[initials]);
        });
        return result;
    }

    constructor(public name: PersonName, public tasks: string[] = []) {
    }
}

require('../../config/pathologists.json').forEach(item => {
    let pathologist = new Pathologist(new PersonName(item.name.given, item.name.family));
    logger.debug(pathologist.name.initials);
    byInitials[pathologist.name.initials] = pathologist;
});

logger.info('loaded pathologists', Pathologist.allInitials().sort());
