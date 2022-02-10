import tester from '@dword-design/tester'
import testerPluginTmpDir from '@dword-design/tester-plugin-tmp-dir'
import ts from 'typescript'

import self from '.'

export default tester(
  [
    {
      code: "'str'",
      result: 'str',
    },
    {
      code: 'true',
      result: true,
    },
    {
      code: 'false',
      result: false,
    },
    {
      code: 'undefined',
      result: undefined,
    },
    {
      code: 'null',
      result: null,
    },
    {
      code: '8',
      result: 8,
    },
    {
      code: '8.5',
      result: 8.5,
    },
    {
      code: '() => {}',
      result: undefined,
    },
    {
      code: "['str', 12, true, false, null, undefined]",
      result: ['str', 12, true, false, null, undefined],
    },
    {
      code: "['str', ...['foo']]",
      result: ['str'],
    },
    {
      code: "['test1', { foo: 'bar' }]",
      result: ['test1', { foo: 'bar' }],
    },
    {
      code: "{ foo: 'bar', test: 8 }",
      result: { foo: 'bar', test: 8 },
    },
    {
      code: "{ ['foo']: 'bar', test: 8 }",
      result: { test: 8 },
    },
    {
      code: "{ foo: 'bar', test: { bar: 'baz' } }",
      result: { foo: 'bar', test: { bar: 'baz' } },
    },
    {
      code: '{ false: false }',
      result: { false: false },
    },
    {
      code: "{ foo: 'bar', ...{ spreaded: 'foo' } }",
      result: { foo: 'bar' },
    },
    {
      code: "{ foo: 'bar', ...bar }",
      result: { foo: 'bar' },
    },
    {
      code: '{ foo() {} }',
      result: {},
    },
    {
      code: "{ foo: ['test1'] }",
      result: { foo: ['test1'] },
    },
    {
      code: `{ "foo": "bar" }`,
      result: { foo: 'bar' },
    },
  ],
  [
    {
      transform: test => () => {
        const ast = ts.createSourceFile(
          'x.ts',
          `export default ${test.code}`,
          ts.ScriptTarget.Latest
        )
        expect(self(ast.statements[0].expression)).toEqual(test.result)
      },
    },
    testerPluginTmpDir(),
  ]
)
