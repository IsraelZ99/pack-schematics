import {
  Rule, SchematicContext, Tree, Source, move, apply, url, mergeWith, template
} from '@angular-devkit/schematics';

/*import {
  Rule, SchematicContext, Tree, Source,
  url, mergeWith, move, apply, source
} from '@angular-devkit/schematics';*/

import { CreateFromTemplateOptions } from "./schema";
import { normalize } from "@angular-devkit/core";

export function createFromTemplate(_options: CreateFromTemplateOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const source: Source = url("./files");
    const transformedSource: Source = apply(source, [
      template({
        filaname: _options.path,
        ...String // dasherize, classify, camelize, etc
      }),
      move(normalize(_options.path))
    ]);

    return mergeWith(transformedSource)(tree, _context);

    /* ****** COPIAR ARCHIVOS DE UNA CARPETA A OTRA *******************/
    /*const source: Source = url("./files");
    const transformedSource: Source = apply(source, [move(normalize(_options.folder))
    ]);
    return mergeWith(transformedSource)(tree, _context);*/
  };
}
