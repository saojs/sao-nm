const superb = require('superb')
const camelcase = require('camelcase')

module.exports = {
  transformerOptions: {
    context: {
      camelcase
    }
  },
  generators: [
    {
      name: 'donation',
      from: './generators/donation'
    }
  ],
  prompts() {
    return [
      {
        name: 'name',
        message: 'What is the name of the new project',
        default: this.outFolder
      },
      {
        name: 'description',
        message: 'How would you describe the new project',
        default: `my ${superb()} project`
      },
      {
        name: 'author',
        message: 'What is your name',
        default: this.gitUser.name,
        store: true,
        required: true
      },
      {
        name: 'username',
        message: 'What is your GitHub username',
        default: ({ author }) => this.gitUser.username || author.toLowerCase(),
        store: true
      },
      {
        name: 'email',
        message: 'What is your GitHub email',
        default: this.gitUser.email,
        store: true,
        validate: v => /.+@.+/.test(v)
      },
      {
        name: 'website',
        message: 'What is the url of your website',
        default({ username }) {
          return `https://github.com/${username}`
        },
        store: true
      },
      {
        name: 'unitTest',
        message: 'Do you need unit test?',
        type: 'confirm',
        default: false
      },
      {
        name: 'coverage',
        message: 'Do you want to add test coverage support?',
        type: 'confirm',
        default: false,
        when: answers => answers.unitTest
      },
      {
        name: 'eslint',
        message: 'Choose an ESLint tool',
        type: 'list',
        default: 'xo',
        choices: ['xo', 'standard', 'disable']
      },
      {
        name: 'compile',
        message: 'Do you need to compile ES2015 code?',
        type: 'confirm',
        default: false
      },
      {
        name: 'poi',
        type: 'confirm',
        default: false,
        message: 'Use Poi (poi.js.org) to run and build example',
        when: answers => answers.compile
      },
      {
        name: 'cli',
        message: 'Do you want to add a CLI',
        type: 'confirm',
        default: false,
        when: answers => !answers.compile
      },
      {
        name: 'twitter',
        message: 'What is your twitter username?',
        store: true
      }
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
          'example/**': 'poi',
          'poi.config.js': 'poi'
        }
      },
      {
        type: 'move',
        patterns: {
          // We keep `.gitignore` as `gitignore` in the project
          // Because when it's published to npm
          // `.gitignore` file will be ignored!
          gitignore: '.gitignore',
          'circle-*.yml': 'circle.yml'
        }
      }
    ]
  },
  async completed() {
    await this.gitInit()
    await this.npmInstall({ packageManager: this.answers.pm })
    this.showProjectTips()
  }
}
