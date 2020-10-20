import { chain, noop, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function component(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    return chain([
      createFiles(_options),
      _options.skipModule ? noop() : updateModule(_options)
    ])(tree,_context);
  };
}

export function createFiles(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    _context.logger.info('Will create files from templates');
    return tree;
  };
}

export function updateModule(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    _context.logger.info('Will update module');
    return tree;
  };
}




