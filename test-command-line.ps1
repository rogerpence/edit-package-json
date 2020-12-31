node index.js -k "dev:tw" -v '""cross-env NODE_ENV=development postcss ./tailwind/tailwind.main.css -o ./dist/css/tailwind.css""' -f
node index.js -k "prod:tw" -v '""cross-env NODE_ENV=production postcss ./tailwind/tailwind.main.css -o ./dist/css/tailwind.css""' -f
node index.js -k "qaqa:tw" -v "cross-env^NODE_ENV=production^postcss^./tailwind/tailwind.main.css^-o^./dist/css/tailwind.css" -f
# npx npmAddScript -k colleen -v "cross-env NODE_ENV=development postcss ./tailwind/tailwind.main.css -o ./dist/css/tailwind.css"