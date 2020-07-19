// @ts-check

/** @type {import('sao').GeneratorConfig} */
module.exports = {
  description: 'Add a "postinstall" script to show donation URL',
  async prepare() {
    if (!(await this.hasOutputFile('package.json'))) {
      throw this.createError(`Cannot find package.json in ${this.outFolder}`)
    }
  },
  prompts() {
    return [
      {
        type: 'input',
        name: 'name',
        default: this.pkg.name || this.outFolder,
        message: 'Your project name',
        required: true,
      },
      {
        type: 'input',
        name: 'url',
        message: 'The URL where users can donate to your project',
        store: true,
        required: true,
        validate: (v) =>
          /^https?:\/\//.test(v)
            ? false
            : `Invalid URL, must start with http(s)://`,
      },
    ]
  },
  actions() {
    return [
      this.answers.url !== 'none' && {
        type: 'modify',
        files: 'package.json',
        handler: (data) => {
          data.scripts = Object.assign({}, data.scripts, {
            postinstall: `node -e \"console.log('\\u001b[35m\\u001b[1mLove ${this.answers.name}? You can now donate to support the author:\\u001b[22m\\u001b[39m\\n> \\u001b[36m${this.answers.url}\\u001b[39m')\"`,
          })
          return data
        },
      },
    ].filter(Boolean)
  },
  async completed() {
    this.logger.success('Added "postinstall" script in package.json!')
    const commands = [
      process.cwd() !== this.outDir && `cd ${this.outDir}`,
      `${this.npmClient} run postinstall`,
    ].filter(Boolean)
    this.logger.tip(
      `Run ${this.colors.cyan(commands.join(' && '))} to see the effect.`
    )
  },
}
