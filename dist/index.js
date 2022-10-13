"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _filter = _interopRequireDefault(require("@dword-design/functions/dist/filter"));

var _fromPairs = _interopRequireDefault(require("@dword-design/functions/dist/from-pairs"));

var _map = _interopRequireDefault(require("@dword-design/functions/dist/map"));

var _typescript = _interopRequireDefault(require("typescript"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const traverse = node => {
  var _ref, _node$elements, _ref2, _ref3, _node$properties;

  switch (node.kind) {
    case _typescript.default.SyntaxKind.StringLiteral:
      return node.text;

    case _typescript.default.SyntaxKind.TrueKeyword:
      return true;

    case _typescript.default.SyntaxKind.FalseKeyword:
      return false;

    case _typescript.default.SyntaxKind.NullKeyword:
      return null;

    case _typescript.default.SyntaxKind.NumericLiteral:
      return parseFloat(node.text);

    case _typescript.default.SyntaxKind.ArrayLiteralExpression:
      return _ref = (_node$elements = node.elements, (0, _filter.default)(element => element.kind !== _typescript.default.SyntaxKind.SpreadElement)(_node$elements)), (0, _map.default)(element => traverse(element))(_ref);

    case _typescript.default.SyntaxKind.ObjectLiteralExpression:
      return _ref2 = (_ref3 = (_node$properties = node.properties, (0, _filter.default)(property => property.kind === _typescript.default.SyntaxKind.PropertyAssignment && (property.name.kind === _typescript.default.SyntaxKind.Identifier || property.name.kind === _typescript.default.SyntaxKind.StringLiteral))(_node$properties)), (0, _map.default)(property => [property.name.escapedText || property.name.text, traverse(property.initializer)])(_ref3)), (0, _fromPairs.default)(_ref2);

    default:
      return undefined;
  } // console.log(rootNode)

  /* ts.forEachChild(rootNode, node => {
    console.log(node)
    if (node.kind === ts.SyntaxKind.NumericLiteral) {
      // data = node |> astToLiteral
    }
  }) */

};

var _default = traverse;
exports.default = _default;
module.exports = exports.default;