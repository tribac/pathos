import * as parse from 'csv-parse';
import * as fs from 'fs';

export class CsvParser {
    public parse(path: string, delimiter = ',') {
        return new Promise<string>(function (resolve, reject) {
            let parser = parse({ delimiter }, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    return resolve(data);
                }
            });
            fs.createReadStream(path).pipe(parser);
        });
    }

}
