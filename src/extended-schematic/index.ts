import { Rule, SchematicContext, Tree, chain, schematic } from '@angular-devkit/schematics';
//import { createFromTemplate } from "../create-from-template";

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function extendedSchematic(_options: any): Rule {

  return (tree: Tree, context: SchematicContext) => {
    return chain([
      schematic('create-from-template', {
      ..._options
    }),
    extend()
  ])(tree, context)
  };

  /*return (tree: Tree, _context: SchematicContext) => {
    return chain([
      createFromTemplate(_options),
        extend()
    ])(tree, _context)
  };*/
}

export function extend(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Extending schematic');
    return tree;
  };
}
