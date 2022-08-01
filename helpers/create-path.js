const path = require('path');

const createPath = (page) => path.resolve(__dirname,'../pages','views', `${page}.ejs`);

module.exports = createPath;