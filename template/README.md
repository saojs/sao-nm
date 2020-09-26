<% const camelcasedName = camelcase(name) -%>

# <%= name %>

[![NPM version](https://badgen.net/npm/v/<%= name %>)](https://npmjs.com/package/<%= name %>) [![NPM downloads](https://badgen.net/npm/dm/<%= name %>)](https://npmjs.com/package/<%= name %>) [![CircleCI](https://badgen.net/circleci/github/<%= username %>/<%= name %>/master)](https://circleci.com/gh/<%= username %>/<%= name %>/tree/master) <% if (coverage) { %> [![codecov](https://codecov.io/gh/<%= username %>/<%= name %>/branch/master/graph/badge.svg)](https://codecov.io/gh/<%= username %>/<%= name %>)
<% } %><% if (username === 'egoist') { %> [![donate](https://badgen.net/badge/support%20me/donate/ff69b4)](https://patreon.com/egoist) [![chat](https://badgen.net/badge/chat%20on/discord/7289DA)](https://chat.egoist.moe)<% } %>

## Install

```bash
<% if (context.npmClient === 'yarn') { %>yarn add<% } else { %>npm i<% } %> <%= name %>
```

## Usage

```js
const <%= camelcasedName %> = require('<%= name %>')

<%= camelcasedName %>()
//=> foo
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**<%= name %>** © [<%= author %>](https://github.com/<%= username %>), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by <%= author %> with help from contributors ([list](https://github.com/<%= username %>/<%= name %>/contributors)).

> [<%= website.replace(/^https?:\/\//, '') %>](<%= website %>) · GitHub [@<%= author %>](https://github.com/<%= username%>)<% if (twitter) { %> · Twitter [@<%= twitter %>](https://twitter.com/<%= twitter %>)<% } %>
