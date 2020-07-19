## NPM package: edit-package-json

`edit-package-json` is an NPM package that makes changes to `package.json` files. It can be used on the command line (as `editPackageJson`) or from within a Node app.

`edit-package-json's` primary purpose is to add `scripts` keys and values to create scriptable installs. For example, during a scripted install of Tailwind, you might want to add a script option or two for compiling Tailwind.

> NPM user COLEWW posted a package named [`npm-add-script`](https://www.npmjs.com/package/npm-add-script) to NPM in 2016 or so. That project has since been archived as read-only on [GitHub](https://github.com/coleww/npm-add-script). I used some of COLEWW's code (especially his example for using the `yargs` package) in this package.

### Installation

Install `edit-package-json` either locally:

    npm install --save-dev @rogerpence/edit-package-json

or globally:

    npm install -g @rogerpence/edit-package-json

### Command line syntax

The command line syntax is:

    npx editpackagejson <options>

where options are:

Option |Shortcut| Description |Required |
|------|-------|--------------|-------- |
|--parent | -p | parent element name name | no, defaults to 'scripts'
|--key    | -k | key name                 | yes
|--value  | -v | key value                | yes
|--force  | -f | force update             | no, defaults to false
|--help   | -h | show help                |

If you attempt to update an existing value, the operation fails with an exception, unless you specific `-f` or `--force`.

See the note below about using embedded blanks in the `--value` option.

Because `edit-package-json` is intended primarily to add `scripts` values the default parent element is `scripts`.

Example:

`package.json` before:

    "scripts": {
        "test": "mocha",
    }

Run `editpackagejson`

    $ npx editpackagejson -k "dev:tw" -v "postcss... "

`package.json` after:

The `dev:key` and its value have been added to the `scripts` element.

    "scripts": {
        "test": "mocha",
        "dev:tw": "postcss..."
    }

### Calling editPackageJson in Node.js

Pass a JavaScript object with the necessary option names (omitting the leading dashes):

    const editPackageJson = require('@rogerpence/edit-package-json');

    const args = {
        key: 'shakey',
        value: 'cross-env NODE_ENV=dev ...',
        force: true
    }

    editPackageJson(args)

### Key values with embedded blanks on the command line

Embedded blanks cause most command processors trouble. Use the following guide for delimiting values with embedded blanks:

#### PowerShell

Use `'"" and ""'` to delimit the value:

    npx editpackagejson -k "dev:tw" -v '""cross-env NODE_ENV=dev mycommand""'

#### DOS command prompt and Bash command line:

Use `"\"` and `"\"` to delimit the value:

    npx editpackagejson -k "dev:tw" -v "\"cross-env NODE_ENV=dev mycommand"\"


