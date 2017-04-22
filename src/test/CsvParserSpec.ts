import { CsvParser } from '../lib/CsvParser';

describe('CSV', function() {
    describe.skip('local parseCsv function', function() {
        const parse = require('csv-parse');
        const fs = require('fs');
        const parseCsv = function(path, delimiter) {
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
        it('should parse config/horaire.csv', function (done) {
            let data = parseCsv('config/horaire.csv', ',')
            .then(function(data) {
                console.log(data);
                done();
            }).catch(function(err) {
                console.log('erreur: ', err);
            });
        });
    });

    describe('CsvParser', function() {
        it('should parse config/horaire.csv', async function () {
            let data = await new CsvParser().parse('config/horaire.csv', ',')
            // console.log(data);
        });
    });
});