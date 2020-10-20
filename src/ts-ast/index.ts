import { Rule, SchematicContext, Tree, SchematicsException } from '@angular-devkit/schematics';
import * as ts from 'typescript';

import { TsAstOptions } from "./schema";

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function tsAst(_options: TsAstOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const buffer = tree.read(_options.path);
    if(!buffer) {
      throw new SchematicsException (`File ${_options.path} not found.`);
    }

    const source = ts.createSourceFile(_options.path, buffer.toString(), ts.ScriptTarget.Latest, true);
    const nodes = getSourceNodes(source);

    const interfaceDeclaration = nodes.find(n => n.kind === ts.SyntaxKind.InterfaceDeclaration);

    if(!interfaceDeclaration) {
      throw new SchematicsException(`No Interface found`);
    }

    const [openBrace, closeBrace] = [
      interfaceDeclaration!.getChildren().find(n=>n.kind===ts.SyntaxKind.OpenBraceToken),
      interfaceDeclaration!.getChildren().slice().reverse().find(n=>n.kind===ts.SyntaxKind.CloseBraceToken),
    ]

    const text = interfaceDeclaration!.getText();
    let indentation;
    const matches = text.match(/\r?\n\s*/);
    if (matches && matches.length > 0) {
      indentation = matches[0]
    } else {
      indentation= ''
    }

    const recorder = tree.beginUpdate(_options.path);
    recorder.insertRight(openBrace!.end, `${indentation}first: string;`);
    recorder.insertLeft(closeBrace!.pos, `${indentation}last: string;`);
    tree.commitUpdate(recorder);
    return tree;

  };
}

function getSourceNodes(sourceFile: ts.SourceFile): ts.Node[] {
  const nodes: ts.Node[] = [sourceFile];
  const result = [];

  while (nodes.length > 0) {
    const node = nodes.shift();

    if (node) {
      result.push(node);
      if (node.getChildCount(sourceFile) >= 0) {
        nodes.unshift(...node.getChildren());
      }
    }
  }

  return result;
}
