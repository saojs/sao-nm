const superb = require('superb')
const camelcase = require('camelcase')

module.exports = {
  generators: [
    {
      name: 'donation',
      from: './generators/donation'
    }
  ],
  prompts: [
    {
      name: 'name',
      message: 'What is the name of the new project',
      default: '[folderName]'
    },
    {
      name: 'description',
      message: 'How would you describe the new project',
      default: `my ${superb()} project`
    },
    {
      name: 'author',
      message: 'What is your name',
      default: '[gitUser]',
      store: true
    },
    {
      name: 'username',
      message: 'What is your GitHub username',
      default: '[gitUser]',
      store: true
    },
    {
      name: 'email',
      message: 'What is your GitHub email',
      default: '[gitEmail]',
      store: true,
      validate: v => /.+@.+/.test(v)
    },
    {
      name: 'website',
      message: 'What is the url of your website',
      default(answers) {
        return `https://github.com/${answers.username}`
      },
      store: true
    },
    {
      name: 'pm',
      message: 'Choose a package manager',
      choices: ['npm', 'yarn'],
      type: 'list',
      default: 'yarn'
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
      message: 'Choose an eslint tool',
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
      message: 'Use egoist/poi to run and build example',
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
  ],
  actions: [
    {
      type: 'add',
      files: '**',
      filters: {
        'test/**': 'unitTest',
        'src/**': 'compile',
        'index.js': '!compile',
        'cli.js': 'cli',
        'circle-npm5.yml': 'pm === "npm5"',
        'circle-yarn.yml': 'pm === "yarn"',
        'example/**': 'poi'
      },
      transformerOptions: {
        context: {
          camelcase
        }
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
  ],
  async completed() {
    await this.gitInit()
    await this.npmInstall({ packageManager: this.answers.pm })
    this.showCompleteTips()
  }
}
