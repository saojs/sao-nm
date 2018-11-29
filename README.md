<h1 align="center">sao-nm</h1>

<p align="center">
  Scaffolding out a node module.
</p>

<p align="center">
<a href="https://npmjs.com/package/sao-nm"><img src="https://img.shields.io/npm/v/sao-nm.svg?style=flat" alt="NPM version"></a> <a href="https://npmjs.com/package/sao-nm"><img src="https://img.shields.io/npm/dm/sao-nm.svg?style=flat" alt="NPM downloads"></a> <a href="https://circleci.com/gh/saojs/sao-nm"><img src="https://img.shields.io/circleci/project/saojs/sao-nm/master.svg?style=flat" alt="Build Status"></a> <a href="https://github.com/egoist/donate"><img src="https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&amp;style=flat" alt="donate"></a>
</p>

<p align="center">
  <img src="https://user-images.githubusercontent.com/8784712/28497936-b0c65a1a-6fc5-11e7-8d9d-75d2c297b6d5.png" alt="preview">
</p>

## Features

- Unit test with [jest](https://facebook.github.io/jest/)
- Format code with [Prettier](https://prettier.io/)
- ESLint with [xo](https://github.com/sindresorhus/xo) or [standard](https://github.com/feross/standard)
- Fix and format code on each commit
- CircleCI [2.0](https://circleci.com/docs/2.0/) with npm^5 or yarn support
- Optionally [compile ES2015 code](./docs/compile-es2015.md) using [bili](https://github.com/unipahq/bili)
- Optionally add coverage report
- Optionally add CLI

## Usage

Install [SAO](https://github.com/saojs/sao) first.

```bash
yarn global add sao
# or npm
npm i -g sao
```

### From git

```bash
sao saojs/sao-nm
```

### From npm

```bash 
sao nm
```

## License

MIT &copy; EGOIST
