import { Pathologist, ByInitials } from './Pathologist';
import { Task } from './Task';
import * as bunyan from 'bunyan';

const logger = bunyan.createLogger({name: 'Specialty', level: 'debug'});

export type PathologistByTaskCode = {[taskCode: string]: Pathologist[]};

const byTask: PathologistByTaskCode = {};

export class Specialty {
    // constructor(public pathologist: Pathologist,
    //             public task: Task) {
    //     pathologist.tasks.push(task);
    // }
}

require('../../config/horaire.json').forEach(item => {
    let taskName = item['TÂCHE'];
    let pathologistInitials: string[] = item['Pathologistes'].split(',');
    if (!pathologistInitials) {
        logger.warn('no initials for task: ' + taskName);
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
            let pathologist = Pathologist.byInitials(initials);
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
        pathologists = Pathologist.allByInitials();
    
        initialsToRemove.forEach(initials => {
            // logger.debug('removing initials: ' + initials);
            delete pathologists[initials];
        });
    }

    let task = Task.byName(taskName);
    if (!task) {
        logger.warn(taskName, 'not found');
        return;
    }
    Object.keys(pathologists).forEach(initials => {
        let pathologist = pathologists[initials];
        pathologist.tasks.push(task.name);
        task.pathologists.push(pathologist.name.initials);
        if (!byTask[task.code]) {
            byTask[task.code] = [];
        }
        byTask[task.code].push(pathologist);
    });

    // logger.info(pathologists);
    // logger.info(Object.keys(pathologists).length);

    // logger.info(task);
});

