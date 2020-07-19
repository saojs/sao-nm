<%_ if (compile) { -%>
import <%= camelcase(name) %> from '../src'
<%_ } else { -%>
const <%= camelcase(name) %> = require('../')
<%_ } -%>

test('main', () => {
  expect(typeof <%= camelcase(name) %>).toBe('function')
})
