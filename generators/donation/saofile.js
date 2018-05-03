module.exports = {
  description: 'Add a postinstall script to show donation URL',
  prompts: [
    {
      name: 'name',
      default: '[pkg.name]',
      message: 'Your project name',
      required: true
    },
    {
      name: 'donateUrl',
      message: 'The URL where users can donate to your project',
      store: true,
      default: 'none',
      filter: v => (/^https?:\/\//.test(v) ? v : 'none')
    }
  ],
  actions() {
    return [
      {
        type: 'modify',
        files: 'package.json',
        handler: data => {
          data.scripts.postinstall = `node -e \"console.log('\\u001b[35m\\u001b[1mLove ${this.answers.name}? You can now donate to support the author:\\u001b[22m\\u001b[39m\\n> \\u001b[36mhttps://patreon.com/egoist\\u001b[39m')\"`
          return data
        }
      }
    ]
  },
  async complete() {
    this.logger.success('Added "postinstall" script in package.json!')
    this.logger.tip(`Run ${this.color.cyan(`${await this.determinePackageManager()} run postinstall`)} to see the effect.`)
  }
}