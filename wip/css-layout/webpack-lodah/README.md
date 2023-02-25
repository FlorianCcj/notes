dir="webpack+less" && mkdir ${dir} && cd ${dir}
npm init
npm install -D webpack webpack-cli
npm install --save lodash

npx webpack
ou en ajoutant "start": "webpack" dans package.json
npm start
