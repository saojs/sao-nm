// const when = (condition, value, fallback) => (condition ? value : fallback);
const commands = cmds => cmds.filter(Boolean).join(' && ') || undefined;

module.exports = (
  {
    name,
    description,
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
      coverage: 'nyc -a -c -r text -r lcov npm test',
      test: commands(['npm run lint', 'mocha --recursive test']),
      lint: eslint
    },
    repository: {
      url: `${username}/${name}`,
      type: 'git'
    },
    author: `${username}<${email}>`,
    license: 'MIT',
    dependencies: {
    },
    devDependencies: {
      semistandard: '^14.0.0',
      mocha: '^7.0.0',
      nyc: '^15.0.0'
    },
    semistandard: { env: ['mocha'] }
  };
};
