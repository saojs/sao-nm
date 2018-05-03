const path = require('path')
const sao = require('sao')

const generator = path.join(__dirname, '..')

const getPkg = (pkg, fields) => {
  pkg = JSON.parse(pkg)
  return fields.reduce((res, curr) => {
    res[curr] = pkg[curr]
    return res
  }, {})
}

test('use defaults', async () => {
  const helper = await sao.mockPrompt(generator, {})
  expect(helper.fileList).toMatchSnapshot()
  expect(getPkg(helper.readFile('package.json'), ['scripts'])).toMatchSnapshot()

  const helper2 = await sao.mockPrompt(
    {
      from: `${generator}:donation`,
      outDir: helper.sao.options.outDir
    },
    {
      donateUrl: 'http://donate.com'
    }
  )
  expect(
    getPkg(helper2.readFile('package.json'), ['scripts'])
  ).toMatchSnapshot('should have postinstall script')
})

test('npm5: add unit test', async () => {
  const helper = await sao.mockPrompt(generator, {
    unitTest: true
  })

  expect(helper.fileList).toMatchSnapshot()
  expect(
    getPkg(helper.readFile('package.json'), ['scripts', 'devDependencies'])
  ).toMatchSnapshot()
})

test('npm5: add coverage', async () => {
  const helper = await sao.mockPrompt(generator, {
    unitTest: true,
    coverage: true
  })

  expect(helper.fileList).toMatchSnapshot()
  expect(helper.readFile('circle.yml')).toMatchSnapshot()
})

test('add cli', async () => {
  const helper = await sao.mockPrompt(generator, {
    cli: true
  })
  expect(helper.fileList).toMatchSnapshot()
  expect(
    getPkg(helper.readFile('package.json'), ['bin', 'dependencies'])
  ).toMatchSnapshot()
})

test('yarn: unit test', async () => {
  const helper = await sao.mockPrompt(generator, {
    unitTest: true,
    pm: 'yarn'
  })
  const config = helper.readFile('circle.yml')
  expect(config).toMatchSnapshot()
  expect(helper.fileList).toMatchSnapshot()
})

test('support poi', async () => {
  const helper = await sao.mockPrompt(generator, {
    compile: true,
    poi: true
  })
  expect(helper.fileList).toMatchSnapshot()
  expect(
    getPkg(helper.readFile('package.json'), [
      'scripts',
      'poi',
      'devDependencies'
    ])
  ).toMatchSnapshot()
})
