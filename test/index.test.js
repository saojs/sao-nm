// @ts-check
const path = require('path')
const { SAO } = require('sao')

const generator = path.join(__dirname, '..')

const getPkg = (pkg, fields) => {
  pkg = JSON.parse(pkg)
  return fields.reduce((res, curr) => {
    res[curr] = pkg[curr]
    return res
  }, {})
}

test('use defaults', async () => {
  const sao = new SAO({ generator, mock: true })
  await sao.run()
  expect(await sao.getOutputFiles()).toMatchSnapshot()
})

test('add unit test', async () => {
  const sao = new SAO({
    generator,
    mock: true,
    answers: {
      unitTest: true,
    },
  })
  await sao.run()

  expect(await sao.getOutputFiles()).toMatchSnapshot('files')
  expect(
    getPkg(await sao.readOutputFile('package.json'), ['scripts', 'devDependencies'])
  ).toMatchSnapshot('package.json')
})

test('add coverage', async () => {
  const sao = new SAO({
    generator,
    mock: true,
    answers: {
      unitTest: true,
      coverage: true,
    },
  })
  await sao.run()

  expect(await sao.getOutputFiles()).toMatchSnapshot('files')
  expect(await sao.readOutputFile('circle.yml')).toMatchSnapshot('circle.yml')
})

test('add cli', async () => {
  const sao = new SAO({
    generator,
    mock: true,
    answers: {
      cli: true,
    },
  })
  await sao.run()
  expect(await sao.getOutputFiles()).toMatchSnapshot('files')
  expect(
    getPkg(await sao.readOutputFile('package.json'), ['bin', 'dependencies'])
  ).toMatchSnapshot('package.json')
})
