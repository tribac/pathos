import { PersonName } from './PersonName';
const pathologists: Pathologist[] = [];

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

    constructor(public name: PersonName) {
    }

}

require('../../config/pathologists.json').forEach(element => {
    pathologists.push(new Pathologist(new PersonName(element.name.given, element.name.family)));
});
