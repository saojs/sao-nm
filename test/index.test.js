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
  const helper = await sao.mock({ generator })
  expect(helper.fileList).toMatchSnapshot()
})

test('add unit test', async () => {
  const helper = await sao.mock({ generator }, {
    unitTest: true
  })

  expect(helper.fileList).toMatchSnapshot('files')
  expect(
    getPkg(await helper.readFile('package.json'), ['scripts', 'devDependencies'])
  ).toMatchSnapshot('package.json')
})

test('add coverage', async () => {
  const helper = await sao.mock({ generator } , {
    unitTest: true,
    coverage: true
  })

  expect(helper.fileList).toMatchSnapshot('files')
  expect(await helper.readFile('circle.yml')).toMatchSnapshot('circle.yml')
})

test('add cli', async () => {
  const helper = await sao.mock({ generator } , {
    cli: true
  })
  expect(helper.fileList).toMatchSnapshot('files')
  expect(
    getPkg(await helper.readFile('package.json'), ['bin', 'dependencies'])
  ).toMatchSnapshot('package.json')
})

test('support poi', async () => {
  const helper = await sao.mock({ generator }, {
    compile: true,
    poi: true
  })
  expect(helper.fileList).toMatchSnapshot('files')
  expect(
    getPkg(await helper.readFile('package.json'), [
      'scripts',
      'devDependencies'
    ])
  ).toMatchSnapshot('package.json')
})
