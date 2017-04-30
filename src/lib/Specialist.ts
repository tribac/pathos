import { PersonName } from './PersonName';
import * as bunyan from 'bunyan';

export type ByInitials = {[initials: string]: Specialist};

const byInitials: ByInitials = {};

const logger = bunyan.createLogger({name: 'Pathologist', level: 'debug'});

// declare function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K>;

export class Specialist {

    public static allByInitials(): ByInitials {
        // return pick(byInitials, ...Object.keys(byInitials));
        let result: ByInitials = {};
        Object.keys(byInitials).forEach(function(initials) {
            result[initials] = byInitials[initials];
        });
        return result;
    }

    public static byInitials(initials: string): Specialist {
        return byInitials[initials];
    }

    public static allInitials(): string[] {
        return Object.keys(byInitials);
    }

    public static all(): Specialist[] {
        let result: Specialist[] = [];
        Object.keys(byInitials).forEach(function(initials) {
            result.push(byInitials[initials]);
        });
        return result;
    }

    constructor(public name: PersonName, public specialties: string[] = []) {
    }
}

require('../../config/specialists.json').forEach(item => {
    let specialist = new Specialist(new PersonName(item.name.given, item.name.family));
    logger.debug(specialist.name.initials);
    byInitials[specialist.name.initials] = specialist;
});

logger.info('loaded specialists', Specialist.allInitials().sort());
