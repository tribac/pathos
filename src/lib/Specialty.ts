import * as bunyan from 'bunyan';

const byCode: {[code: string]: Specialty} = {};
const byName: {[name: string]: Specialty} = {};

export class Specialty {
    public static byCode(code: string): Specialty {
        return byCode[code];
    }

    public static allCodes(): string[] {
        return Object.keys(byCode);
    }

    public static byName(name: string): Specialty {
        return byName[name];
    }

    public static allNames(): string[] {
        return Object.keys(byName);
    }

    public pathologists: string[] = [];

    constructor(public name: string,
                public code: string,
                public weight: number,
                public startTime: number,
                public endTime: number) {
    }
}

const logger = bunyan.createLogger({name: 'Specialty', level: 'debug'});

require('../../config/specialties.json').forEach(item => {
    let specialty = new Specialty(item.name, item.code, item.weight, item.startTime, item.endTime);
    // logger.debug(specialty);
    byCode[specialty.code] = specialty;
    byName[specialty.name] = specialty;
});;

logger.info('loaded specialties', Specialty.allCodes().length, Specialty.allNames().length);
