#!/usr/bin/env node
// shebang #! 用于启动该文件的一个环境
// node app.js
// live-server
// vue init abc
// vue --version
const commander = require('commander')
//co
commander.version('1.0.0')
.usage('<command> [项目名称]')
.command('init','init project')
.command('hello','hello')
.parse(process.argv)
//node app.js init webpack --version 