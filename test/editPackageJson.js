const fs = require('fs');
var assert = require('chai').assert;
var expect = require('chai').expect;
const editPackageJson = require('..');

function readPackageJsonKey(key) {
    let data = fs.readFileSync("package.json", 'utf8');
    const pkgFile = JSON.parse(data);
    if (pkgFile.scripts[key]) {
        return pkgFile.scripts[key];
    }
    return null;
}

const args1 = {
    parent: 'scripts',
    key: 'shakey1',
    value: 'cross-env NODE_ENV=development postcss ./tailwind/tailwind.main.css -o ./dist/css/tailwind.css',
    force: true
}

const args2 = {
    key: 'shakey2',
    value: 'keep on rockin\' in the free world',
    force: true
}

const args3 = {
    key: 'shakey3',
    value: 'keep on rockin\' in the free world',
    force: false
}

const args4 = {
    key: 'shakey4',
    value: 'cross-env^NODE_ENV=development^postcss^./tailwind/tailwind.main.css^-o^./dist/css/tailwind.css',
    target_value: 'cross-env NODE_ENV=development postcss ./tailwind/tailwind.main.css -o ./dist/css/tailwind.css',
    force: true
}

describe('check skakey keys', function () {
    it('args1 - test "scripts" change', function () {
         editPackageJson(args1)
         const key = readPackageJsonKey('shakey1');
         assert.equal(key, args1.value)
    });

    it('args2 - test implicit "scripts" element', function () {
        editPackageJson(args2)
        const key = readPackageJsonKey('shakey2');
        assert.equal(key, args2.value)
    });
    it('args3 - test key value already exists', function () {
        assert.throw(() => { editPackageJson(args)}, Error);
    });

    it('args4 - test swapping all carets for blanks', function () {
        editPackageJson(args4)
        const value = readPackageJsonKey('shakey4');
        assert.equal(value, args4.target_value)
   });
});
