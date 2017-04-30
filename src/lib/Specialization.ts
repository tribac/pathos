import { Specialist, ByInitials } from './Specialist';
import { Specialty } from './Specialty';
import * as bunyan from 'bunyan';

const logger = bunyan.createLogger({name: 'Specialty', level: 'debug'});

export type PathologistBySpecialtyCode = {[specialtyCode: string]: Specialist[]};

const bySpecialty: PathologistBySpecialtyCode = {};

export class Specialization {
    // constructor(public pathologist: Pathologist,
    //             public specialty: Specialty) {
    //     pathologist.specialties.push(specialty);
    // }
}

require('../../config/horaire.json').forEach(item => {
    let specialtyName = item['TÂCHE'];
    let pathologistInitials: string[] = item['Pathologistes'].split(',');
    if (!pathologistInitials) {
        logger.warn('no initials for specialty: ' + specialtyName);
        return;
    }
    logger.debug('pathologistInitials', pathologistInitials);

    let pathologists: ByInitials = {};
    let initialsToRemove: string[] = [];
    pathologistInitials.forEach(initials => {
        initials = initials.trim();
        // logger.debug('initials', initials);
        if (initials.startsWith('-')) {
            initialsToRemove.push(initials.slice(1));
        } else {
            let pathologist = Specialist.byInitials(initials);
            if (pathologist) {
                pathologists[initials] = pathologist;
            }
        }
    });

    if (initialsToRemove.length > 0) {
        let initialsToKeep = Object.keys(pathologists);
        if (initialsToKeep.length > 0) {
            logger.warn(`will process non-negated ${initialsToKeep} as removal`);
            initialsToRemove.push(...initialsToKeep);
        }
        logger.debug('initialsToRemove', initialsToRemove);
        pathologists = Specialist.allByInitials();
    
        initialsToRemove.forEach(initials => {
            // logger.debug('removing initials: ' + initials);
            delete pathologists[initials];
        });
    }

    let specialty = Specialty.byName(specialtyName);
    if (!specialty) {
        logger.warn(specialtyName, 'not found');
        return;
    }
    Object.keys(pathologists).forEach(initials => {
        let pathologist = pathologists[initials];
        pathologist.specialties.push(specialty.name);
        specialty.pathologists.push(pathologist.name.initials);
        if (!bySpecialty[specialty.code]) {
            bySpecialty[specialty.code] = [];
        }
        bySpecialty[specialty.code].push(pathologist);
    });

    // logger.info(pathologists);
    // logger.info(Object.keys(pathologists).length);

    // logger.info(specialty);
});

