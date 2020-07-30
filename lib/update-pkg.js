// const when = (condition, value, fallback) => (condition ? value : fallback);
// const commands = cmds => cmds.filter(Boolean).join(' && ') || undefined;

module.exports = ({ name, description, license, username, email }, data) => {
  return {
    name,
    version: '0.0.0',
    description,
    main: 'src/index.js',
    files: ['src'],
    scripts: {
      coverage: 'nyc npm test',
      pretest: 'xo',
      test: 'mocha --recursive test'
    },
    repository: `${username}/${name}`,
    author: `${name} <${email}>`,
    license: license === 'BSD-3-Clause' ? license : 'SEE LICENSE IN LICENSE',
    dependencies: {},
    devDependencies: {
      chai: '^4.2.0',
      'eslint-config-semistandard': '*',
      'eslint-config-standard': '*',
      'eslint-plugin-node': '*',
      'eslint-plugin-standard': '*',
      mocha: '^7.0.0',
      nyc: '^15.0.0',
      xo: '*'
    },
    nyc: {
      include: ['src'],
      reporter: ['lcov', 'text'],
      cache: true,
      all: true
    },
    xo: { env: ['mocha'], extends: 'semistandard' }
  };
};
