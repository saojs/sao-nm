// @ts-check
const superb = require('superb')
const camelcase = require('camelcase')

/** @type {import('sao').GeneratorConfig} */
const config = {
  description: 'Scaffolding out a node module.',
  subGenerators: [
    {
      name: 'donation',
      generator: './generators/donation',
    },
  ],
  prompts() {
    return [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the new project',
        default: this.outFolder,
      },
      {
        type: 'input',
        name: 'description',
        message: 'How would you describe the new project',
        default: `my ${superb.random()} project`,
      },
      {
        type: 'input',
        name: 'author',
        message: 'What is your name',
        default: this.gitUser.name,
        store: true,
        required: true,
      },
      {
        type: 'input',
        name: 'username',
        message: 'What is your GitHub username',
        default: ({ answers }) =>
          this.gitUser.username || answers.author.toLowerCase(),
        store: true,
      },
      {
        type: 'input',
        name: 'email',
        message: 'What is your GitHub email',
        default: this.gitUser.email,
        store: true,
        validate: (v) => /.+@.+/.test(v),
      },
      {
        type: 'input',
        name: 'website',
        message: 'What is the url of your website',
        default({ answers }) {
          return `https://github.com/${answers.username}`
        },
        store: true,
      },
      {
        type: 'confirm',
        name: 'unitTest',
        message: 'Do you need unit test',
        default: false,
      },
      {
        type: 'confirm',
        name: 'coverage',
        message: 'Do you want to add test coverage support',
        default: false,
        skip({ answers }) {
          return !answers.unitTest
        },
      },
      {
        type: 'select',
        name: 'eslint',
        message: 'Choose an ESLint tool',
        default: 'xo',
        choices: ['xo', 'standard', 'disabled'],
      },
      {
        type: 'confirm',
        name: 'compile',
        message: 'Do you need to compile ES2015 code',
        default: false,
      },
      {
        type: 'confirm',
        name: 'cli',
        message: 'Do you want to add a CLI',
        default: false,
        skip({ answers }) {
          return answers.compile
        },
      },
      {
        type: 'input',
        name: 'twitter',
        message: 'What is your twitter username',
        store: true,
      },
    ]
  },
  actions() {
    return [
      {
        type: 'add',
        files: '**',
        filters: {
          'test/**': 'unitTest',
          'src/**': 'compile',
          'index.js': '!compile',
          'cli.js': 'cli',
          'circle-npm.yml': this.npmClient === 'npm',
          'circle-yarn.yml': this.npmClient === 'yarn',
        },
        data: {
          camelcase,
        },
      },
      {
        type: 'move',
        patterns: {
          // We keep `.gitignore` as `gitignore` in the project
          // Because when it's published to npm
          // `.gitignore` file will be ignored!
          gitignore: '.gitignore',
          'circle-*.yml': 'circle.yml',
          '_package.json': 'package.json',
        },
      },
      {
        type: 'modify',
        files: 'package.json',
        // @ts-ignore
        handler: (data) => require('./lib/update-pkg')(this.answers, data),
      },
    ]
  },
  async completed() {
    await this.gitInit()
    await this.npmInstall()
    this.showProjectTips()
  },
}

module.exports = config
