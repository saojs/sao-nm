#!/usr/bin/env node
'use strict'
const cac = require('cac')
const main = require('./')

const cli = cac()

cli.command('*', 'My Default Command', (input, flags) => {
  main(input, flags)
})

cli.parse()
