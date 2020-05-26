// const when = (condition, value, fallback) => (condition ? value : fallback);
const commands = cmds => cmds.filter(Boolean).join(' && ') || undefined;

module.exports = (
  {
    name,
    description,
    license,
    username,
    email
  },
  data
) => {
  const eslint = 'semistandard';
  return {
    name,
    version: '0.0.0',
    description,
    main: 'src/index.js',
    files: ['src'],
    scripts: {
      coverage: 'nyc npm test',
      pretest: eslint,
      test: 'mocha --recursive test'
    },
    repository: {
      url: `${username}/${name}`,
      type: 'git'
    },
    author: `${name} <${email}>`,
    license: license === 'BSD-3-Clause' ? license : 'SEE LICENSE IN LICENSE',
    dependencies: {
    },
    devDependencies: {
      chai: '^4.2.0',
      semistandard: '^14.0.0',
      mocha: '^7.0.0',
      nyc: '^15.0.0'
    },
    nyc: {
      include: ['src'],
      reporter: ['lcov', 'text'],
      cache: true,
      all: true
    },
    semistandard: { env: ['mocha'] }
  };
};
