
const fs = require('fs');
const path = require('path');

module.exports = {
  description: 'Add a "postinstall" script to show donation URL',
  prepare () {
    if (!fs.existsSync(path.join(this.outPath, 'package.json'))) {
      throw this.createError(`Cannot find package.json in ${this.outPath}`);
    }
  },
  prompts () {
    return [
      {
        name: 'name',
        default: this.pkg.name || this.outFolder,
        message: 'Your project name',
        required: true
      },
      {
        name: 'url',
        message: 'The URL where users can donate to your project',
        store: true,
        required: true,
        validate: v => /^https?:\/\//.test(v)
      }
    ];
  },
  actions () {
    return [
      this.answers.url !== 'none' && {
        type: 'modify',
        files: 'package.json',
        handler: data => {
          data.scripts = Object.assign({}, data.scripts, {
            postinstall: `node -e \"console.log('\\u001b[35m\\u001b[1mLove ${this.answers.name}? You can now donate to support the author:\\u001b[22m\\u001b[39m\\n> \\u001b[36m${this.answers.url}\\u001b[39m')\"`
          });
          return data;
        }
      }
    ].filter(Boolean);
  },
  async completed () {
    this.logger.success('Added "postinstall" script in package.json!');
    const commands = [process.cwd() !== this.outPath && `cd ${this.outPath}`, `${this.npmClient} run postinstall`].filter(Boolean);
    this.logger.tip(`Run ${this.chalk.cyan(commands.join(' && '))} to see the effect.`);
  }
};
