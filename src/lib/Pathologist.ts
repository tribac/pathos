import { Name } from './Name';
const pathologists: Pathologist[] = require('../../config/pathologists.json');

export class Pathologist {

    public static byInitials(initials: string): Pathologist {
        let result: Pathologist;
        pathologists.forEach(function(each: Pathologist) {
            if (each.name.initials === initials) {
                result = each;
                return;
            }
        });
        return result;
    }

    constructor(public name: Name) {
    }

}
