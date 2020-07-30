const superb = require('superb');
const camelcase = require('camelcase');

module.exports = {
  description: 'Scaffolding out a node module.',
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
  prompts () {
    return [
      {
        name: 'name',
        message: 'What is the name of the new project',
        default: this.outFolder.replace('node-', '')
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
        default: ({ author }) => this.gitUser.username || author.toLowerCase().replace(/\s+/g, ''),
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
        default ({ username }) {
          return 'https://github.com/noblesamurai/';
        },
        store: true
      },
      {
        name: 'license',
        message: 'What is the license?',
        type: 'list',
        default: 'UNLICENSED',
        choices: ['BSD-3-Clause', 'UNLICENSED']
      }
    ];
  },
  actions () {
    return [
      {
        type: 'add',
        files: '**'
      },
      {
        type: 'move',
        patterns: {
          // We keep `.gitignore` as `gitignore` in the project
          // Because when it's published to npm
          // `.gitignore` file will be ignored!
          gitignore: '.gitignore',
          'circle-*.yml': 'circle.yml',
          '_package.json': 'package.json'
        }
      },
      {
        type: 'modify',
        files: 'package.json',
        handler: data => require('./lib/update-pkg')(this.answers, data)
      }
    ];
  },
  async completed () {
    await this.gitInit();
    await this.npmInstall({ npmClient: 'npm' });
    this.showProjectTips();
  }
};
