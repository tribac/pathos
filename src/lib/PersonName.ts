
export class PersonName {

    public static initialsOf(names: string[]): string {
        let result = '';
        names.forEach(function (value) {
            result = result.concat(value.charAt(0));
        });
        return result;
    }

    constructor(public given: string,
                public family: string) {
    }

    public get full(): string {
        return this.given.concat(' ').concat(this.family);
    }

    public get initials(): string {
        return PersonName.initialsOf([
                    ...this.given.split(' '),
                    ...this.family.split(' ')]);
    }

}
