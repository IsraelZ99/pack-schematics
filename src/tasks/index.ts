import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask, TslintFixTask } from '@angular-devkit/schematics/tasks'

export function tasks(_options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const taskId = context.addTask(new NodePackageInstallTask({ packageName: '@schematics/angular' }));
    context.addTask(new TslintFixTask({}), [taskId])
    return tree;
  };
}

/*import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

export function tasks(_options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask({ packageName: '@schematics/angular' }));
    return tree;
  };
}*/