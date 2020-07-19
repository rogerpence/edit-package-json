const addUpdateScript = require('@rogerpence/edit-package-json');

const args = {
    parent: 'scripts',
    key: 'shakey',
    value: 'cross-env NODE_ENV=development postcss ./tailwind/tailwind.main.css -o ./dist/css/tailwind.css',
    force: true
}
addUpdateScript(args);