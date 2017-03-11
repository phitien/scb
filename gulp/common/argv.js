var argv = require('yargs')
.alias('r', 'release')
.describe('r', 'version number in format <major>.<minor>.<patch>')
.string('r')
.argv;
module.exports = exports = argv;
