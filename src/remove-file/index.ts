import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { RemoveFileOptions } from "./schema";

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function removeFile(_options: RemoveFileOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    tree.delete(_options.path);
    return tree;
  };
}
