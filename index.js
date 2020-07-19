#!/usr/bin/env node

const jsonfile = require('jsonfile');
const { exit } = require('yargs');

const editPackageJson = args => {
    args.force = args.force || false;
    args.parent = args.parent || 'scripts';

    try {
        let packaged = jsonfile.readFileSync('package.json')
        if (!packaged[args.parent]) {
            packaged[args.parent] = {}
        }
        if (!args.force && packaged[args.parent][args.key]) {
            const message = `Attempted to update ` + args.parent + '.' + args.key + ` with "` + args.value + `"`
            throw new Error(message)
        }

        packaged[args.parent][args.key] = args.value
        jsonfile.writeFileSync('package.json', packaged, {spaces: 4})
    }
    catch (e) {
        process.stdout.write('An exception occurred:\n')
        process.stdout.write('    ' + e.message)
        process.stdout.write('\n')
        process.exit(1)
    }
}

function cmdline() {
    var argv = require('yargs')
    .alias('h', 'help')
    .help('help')
    .usage('Add or update a value in your package.json file')
    .example('editPackageJson [-p parent_element] -k key -v value [-f]')
    .example('editPackageJson -k "dev:tw:" -v "script..."')
    .alias('p', 'parent')
    .alias('k', 'key')
    .alias('v', 'value')
    .boolean('f')
    .alias('f', 'force')
    .describe('p', 'parent element key')
    .describe('k', 'element key')
    .describe('v', 'element value (usually a script)')
    .describe('f', 'force overwrite if script key already exists')
    .demandOption(['k','v'], 'Please provide both --key (-k) and --value (-v) arguments')
    .argv

    try {
        const args = {parent: argv.p, key: argv.k, value: argv.v, force: argv.f}
        editPackageJson(args)
        process.stdout.write('\n')
    } catch (e) {
        process.stdout.write('An exception occurred:\n')
        process.stdout.write('    ' + e.message)
        process.stdout.write('\n')
        process.exit(1)
    }
}

if (require.main === module) {
    cmdline();
}
 else {
    module.exports = editPackageJson
}
