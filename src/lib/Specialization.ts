import { Specialist, ByInitials } from './Specialist';
import { Specialty } from './Specialty';
import * as bunyan from 'bunyan';

const logger = bunyan.createLogger({name: 'Specialty', level: 'debug'});

export type PathologistBySpecialtyCode = {[specialtyCode: string]: Specialist[]};

const bySpecialty: PathologistBySpecialtyCode = {};

export class Specialization {
    // constructor(public specialist: Pathologist,
    //             public specialty: Specialty) {
    //     specialist.specialties.push(specialty);
    // }
}

require('../../config/horaire.json').forEach(item => {
    let specialtyName = item['TÂCHE'];
    let specialistInitials: string[] = item['Pathologistes'].split(',');
    if (!specialistInitials) {
        logger.warn('no initials for specialty: ' + specialtyName);
        return;
    }
    logger.debug('specialistInitials', specialistInitials);

    let specialists: ByInitials = {};
    let initialsToRemove: string[] = [];
    specialistInitials.forEach(initials => {
        initials = initials.trim();
        // logger.debug('initials', initials);
        if (initials.startsWith('-')) {
            initialsToRemove.push(initials.slice(1));
        } else {
            let specialist = Specialist.byInitials(initials);
            if (specialist) {
                specialists[initials] = specialist;
            }
        }
    });

    if (initialsToRemove.length > 0) {
        let initialsToKeep = Object.keys(specialists);
        if (initialsToKeep.length > 0) {
            logger.warn(`will process non-negated ${initialsToKeep} as removal`);
            initialsToRemove.push(...initialsToKeep);
        }
        logger.debug('initialsToRemove', initialsToRemove);
        specialists = Specialist.allByInitials();
    
        initialsToRemove.forEach(initials => {
            // logger.debug('removing initials: ' + initials);
            delete specialists[initials];
        });
    }

    let specialty = Specialty.byName(specialtyName);
    if (!specialty) {
        logger.warn(specialtyName, 'not found');
        return;
    }
    Object.keys(specialists).forEach(initials => {
        let specialist = specialists[initials];
        specialist.specialties.push(specialty.name);
        specialty.specialists.push(specialist.name.initials);
        if (!bySpecialty[specialty.code]) {
            bySpecialty[specialty.code] = [];
        }
        bySpecialty[specialty.code].push(specialist);
    });

    // logger.info(specialists);
    // logger.info(Object.keys(specialists).length);

    // logger.info(specialty);
});

