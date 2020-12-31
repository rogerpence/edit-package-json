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

    $ npx editpackagejson -k "dev:tw" -v "postcss..."

causes `dev:key` and its value have been added to the `scripts` element.

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

Arguments passed on the command with embedded blanks cause command processors trouble. Use the guide below for platform-specific ways to delimit values with embedded blanks... or let `edit-package-json` do the hard work by using a plus sign (+) anywhere you a want a blank. For example, this:

    npx editpackagejson -k "dev:tw" -v "cross-env+NODE_ENV=dev+mycommand"

resolves to this value in the `package.json` `scripts.dev:tw` value:

    cross-env NODE_ENV=dev mycommand

It's probably easiest to use the plus sign feature and get on with your life. However, if you rather do it the hard way, use the guide below:

#### PowerShell

Use `'"" and ""'` to delimit the value:

    npx editpackagejson -k "dev:tw" -v '""cross-env NODE_ENV=dev mycommand""'

However, in PowerShell if you'd like build a key value with PowerShell's string interpolation, you need to use this convoluted syntax:

    $value = "'`"`"important stuff with ./$($devDirectory)/css/`"`"'"

to cause PowerShell to pass the correct value to `edit-package-json`. This error-prone convolution was the inspiration for adding the plus sign (+) feature.

#### DOS command prompt and Bash command line:

Use `"\"` and `"\"` to delimit the value:

    npx editpackagejson -k "dev:tw" -v "\"cross-env NODE_ENV=dev mycommand"\"


