import * as ts from 'typescript';

export default function traverse<T = unknown>(node: ts.Node): T;
