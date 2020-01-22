const when = (condition, value, fallback) => (condition ? value : fallback);
const commands = cmds => cmds.filter(Boolean).join(' && ') || undefined;

module.exports = (
  {
    eslint,
    unitTest,
    compile,
    cli,
    name,
    coverage,
    description,
    username,
    email
  },
  data
) => {
  const useLinter = eslint !== 'disabled';
  const useXo = eslint === 'xo';
  const useStandard = eslint === 'standard';

  return {
    name,
    version: '0.0.0',
    description,
    main: when(compile, `dist/${name}.cjs.js`, 'index.js'),
    bin: when(cli, 'cli.js'),
    files: when(
      compile,
      ['dist'],
      when(cli, ['index.js', 'cli.js'], ['index.js'])
    ),
    scripts: {
      'test:cov': when(coverage, commands([
        when(useLinter, 'npm run lint'),
        'jest --coverage'
      ])),
      test: commands([
        when(useLinter, 'npm run lint'),
        'jest'
      ]),
      lint: when(useLinter, eslint),
      prepublishOnly: when(compile, 'npm run build'),
      build: when(compile, 'bili')
    },
    repository: {
      url: `${username}/${name}`,
      type: 'git'
    },
    author: `${username}<${email}>`,
    license: 'MIT',
    dependencies: {
      cac: when(cli, '^6.0.0')
    },
    devDependencies: {
      xo: when(useXo, '^0.23.0'),
      'eslint-config-rem': when(useXo, '^4.0.0'),
      prettier: when(useLinter, '^1.15.2'),
      'eslint-config-prettier': when(useXo, '^3.3.0'),
      'eslint-plugin-prettier': when(useXo, '^3.0.0'),
      standard: when(useStandard, '^12.0.0'),
      jest: when(unitTest, '^23.6.0'),
      'lint-staged': '^7.2.0',
      husky: '^1.0.0-rc.13',
      bili: when(compile, '^3.3.0')
    },
    jest: when(unitTest, {
      testEnvironment: 'node'
    }),
    xo: when(useXo, {
      extends: ['rem', 'plugin:prettier/recommended'],
      envs: when(unitTest, ['jest'])
    }),
    husky: {
      hooks: {
        'pre-commit': 'lint-staged'
      }
    },
    'lint-staged': {
      '*.js': when(useLinter, [`${eslint} --fix`, 'git add']),
      [when(useLinter, '*.{json,md}', '*.{js,json,md}')]: [
        'prettier --write',
        'git add'
      ]
    }
  };
};
