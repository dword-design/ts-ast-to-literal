<!-- TITLE/ -->
# ts-ast-to-literal
<!-- /TITLE -->

<!-- BADGES/ -->
<p>
  <a href="https://npmjs.org/package/ts-ast-to-literal">
    <img
      src="https://img.shields.io/npm/v/ts-ast-to-literal.svg"
      alt="npm version"
    >
  </a><img src="https://img.shields.io/badge/os-linux%20%7C%C2%A0macos%20%7C%C2%A0windows-blue" alt="Linux macOS Windows compatible"><a href="https://github.com/dword-design/ts-ast-to-literal/actions">
    <img
      src="https://github.com/dword-design/ts-ast-to-literal/workflows/build/badge.svg"
      alt="Build status"
    >
  </a><a href="https://codecov.io/gh/dword-design/ts-ast-to-literal">
    <img
      src="https://codecov.io/gh/dword-design/ts-ast-to-literal/branch/master/graph/badge.svg"
      alt="Coverage status"
    >
  </a><a href="https://david-dm.org/dword-design/ts-ast-to-literal">
    <img src="https://img.shields.io/david/dword-design/ts-ast-to-literal" alt="Dependency status">
  </a><img src="https://img.shields.io/badge/renovate-enabled-brightgreen" alt="Renovate enabled"><br/><a href="https://gitpod.io/#https://github.com/dword-design/ts-ast-to-literal">
    <img
      src="https://gitpod.io/button/open-in-gitpod.svg"
      alt="Open in Gitpod"
      width="114"
    >
  </a><a href="https://www.buymeacoffee.com/dword">
    <img
      src="https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-2.svg"
      alt="Buy Me a Coffee"
      width="114"
    >
  </a><a href="https://paypal.me/SebastianLandwehr">
    <img
      src="https://sebastianlandwehr.com/images/paypal.svg"
      alt="PayPal"
      width="163"
    >
  </a><a href="https://www.patreon.com/dworddesign">
    <img
      src="https://sebastianlandwehr.com/images/patreon.svg"
      alt="Patreon"
      width="163"
    >
  </a>
</p>
<!-- /BADGES -->

<!-- DESCRIPTION/ -->
Transform a TypeScript AST node into a real JS object.
<!-- /DESCRIPTION -->

Special thanks to [ast-to-literal](https://github.com/hypervillain/ast-to-literal) for the initial idea 👏.

<!-- INSTALL/ -->
## Install

```bash
# npm
$ npm install ts-ast-to-literal

# Yarn
$ yarn add ts-ast-to-literal
```
<!-- /INSTALL -->

## Usage

```js
import ts from 'typescript';
import astToLiteral from 'ts-ast-to-literal';

const ast = ts.createSourceFile(
  'x.ts',
  `export default { foo: 'bar', num: 8 }`,
  ts.ScriptTarget.Latest
)

console.log(astToLiteral(ast.statements[0].expression))
// { foo: 'bar', num: 8 }
```

<!-- LICENSE/ -->
## Contribute

Are you missing something or want to contribute? Feel free to file an [issue](https://github.com/dword-design/ts-ast-to-literal/issues) or a [pull request](https://github.com/dword-design/ts-ast-to-literal/pulls)! ⚙️

## Support

Hey, I am Sebastian Landwehr, a freelance web developer, and I love developing web apps and open source packages. If you want to support me so that I can keep packages up to date and build more helpful tools, you can donate here:

<p>
  <a href="https://www.buymeacoffee.com/dword">
    <img
      src="https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-2.svg"
      alt="Buy Me a Coffee"
      width="114"
    >
  </a>&nbsp;If you want to send me a one time donation. The coffee is pretty good 😊.<br/>
  <a href="https://paypal.me/SebastianLandwehr">
    <img
      src="https://sebastianlandwehr.com/images/paypal.svg"
      alt="PayPal"
      width="163"
    >
  </a>&nbsp;Also for one time donations if you like PayPal.<br/>
  <a href="https://www.patreon.com/dworddesign">
    <img
      src="https://sebastianlandwehr.com/images/patreon.svg"
      alt="Patreon"
      width="163"
    >
  </a>&nbsp;Here you can support me regularly, which is great so I can steadily work on projects.
</p>

Thanks a lot for your support! ❤️

## License

[MIT License](https://opensource.org/license/mit/) © [Sebastian Landwehr](https://sebastianlandwehr.com)
<!-- /LICENSE -->
