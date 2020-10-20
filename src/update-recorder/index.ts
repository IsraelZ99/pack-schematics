import { Rule, SchematicContext, Tree, UpdateRecorder } from '@angular-devkit/schematics';
import { RecorderOptions } from "./schema";

export function updateRecorder(_options: RecorderOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const comment = '// ᕙ(⇀‸↼‶)ᕗ\n';
    const updateRecordera: UpdateRecorder = tree.beginUpdate(_options.path);

    updateRecordera.insertLeft(0, comment);
    updateRecordera.insertLeft(0, comment);
    updateRecordera.insertLeft(0, comment);
    updateRecordera.insertLeft(0, comment);

    tree.commitUpdate(updateRecordera);

    return tree;
  };
}
