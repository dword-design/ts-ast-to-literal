import ts from 'typescript';

const traverse = <T = unknown>(node: ts.Node): T => {
  switch (node.kind) {
    case ts.SyntaxKind.StringLiteral: {
      const stringLiteral = node as ts.StringLiteral;
      return stringLiteral.text as T;
    }

    case ts.SyntaxKind.TrueKeyword: {
      return true as T;
    }

    case ts.SyntaxKind.FalseKeyword: {
      return false as T;
    }

    case ts.SyntaxKind.NullKeyword: {
      return null as T;
    }

    case ts.SyntaxKind.NumericLiteral: {
      const numericLiteral = node as ts.NumericLiteral;
      return Number.parseFloat(numericLiteral.text) as T;
    }

    case ts.SyntaxKind.ArrayLiteralExpression: {
      const arrayLiteral = node as ts.ArrayLiteralExpression;
      return arrayLiteral.elements
        .filter(element => element.kind !== ts.SyntaxKind.SpreadElement)
        .map(element => traverse(element)) as T;
    }

    case ts.SyntaxKind.ObjectLiteralExpression: {
      const objectLiteral = node as ts.ObjectLiteralExpression;
      return Object.fromEntries(
        objectLiteral.properties
          .filter(
            property =>
              property.kind === ts.SyntaxKind.PropertyAssignment &&
              (property.name.kind === ts.SyntaxKind.Identifier ||
                property.name.kind === ts.SyntaxKind.StringLiteral),
          )
          .map(property => {
            const propAssignment = property as ts.PropertyAssignment;

            const name = propAssignment.name as
              | ts.Identifier
              | ts.StringLiteral;

            const key =
              name.kind === ts.SyntaxKind.Identifier
                ? (name as ts.Identifier).escapedText
                : (name as ts.StringLiteral).text;

            return [key, traverse(propAssignment.initializer)];
          }),
      ) as T;
    }

    default: {
      return undefined as T;
    }
  }
};

export default traverse;
