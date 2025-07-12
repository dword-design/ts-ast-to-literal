import ts from 'typescript';

const traverse = <T = unknown>(node: ts.Node): T => {
  switch (node.kind) {
    case ts.SyntaxKind.StringLiteral: {
      return (node as ts.StringLiteral).text as T;
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
      return Number.parseFloat((node as ts.NumericLiteral).text) as T;
    }

    case ts.SyntaxKind.ArrayLiteralExpression: {
      return (node as ts.ArrayLiteralExpression).elements
        .filter(element => element.kind !== ts.SyntaxKind.SpreadElement)
        .map(element => traverse(element)) as T;
    }

    case ts.SyntaxKind.ObjectLiteralExpression: {
      return Object.fromEntries(
        (node as ts.ObjectLiteralExpression).properties
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
