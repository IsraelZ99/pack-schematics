import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { OverwriteFileOptions } from "./schema";

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function overwriteFile(_options: OverwriteFileOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const buffer = tree.read(_options.path);
    const content = buffer ? buffer.toString() : '';
    const commet = `comentario sin sentido`;
    if (!content.includes(commet)) {
      tree.overwrite(_options.path, commet + content);
    }
    return tree;
  };
}
