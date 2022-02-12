import { filter, fromPairs, map } from '@dword-design/functions'
import ts from 'typescript'

const traverse = node => {
  switch (node.kind) {
    case ts.SyntaxKind.StringLiteral:
      return node.text
    case ts.SyntaxKind.TrueKeyword:
      return true
    case ts.SyntaxKind.FalseKeyword:
      return false
    case ts.SyntaxKind.NullKeyword:
      return null
    case ts.SyntaxKind.NumericLiteral:
      return parseFloat(node.text)
    case ts.SyntaxKind.ArrayLiteralExpression:
      return (
        node.elements
        |> filter(element => element.kind !== ts.SyntaxKind.SpreadElement)
        |> map(element => traverse(element))
      )
    case ts.SyntaxKind.ObjectLiteralExpression:
      return (
        node.properties
        |> filter(
          property =>
            property.kind === ts.SyntaxKind.PropertyAssignment &&
            (property.name.kind === ts.SyntaxKind.Identifier ||
              property.name.kind === ts.SyntaxKind.StringLiteral)
        )
        |> map(property => [
          property.name.escapedText || property.name.text,
          traverse(property.initializer),
        ])
        |> fromPairs
      )
    default:
      return undefined
  }

  // console.log(rootNode)
  /* ts.forEachChild(rootNode, node => {
    console.log(node)
    if (node.kind === ts.SyntaxKind.NumericLiteral) {
      // data = node |> astToLiteral
    }
  }) */
}

export default traverse
