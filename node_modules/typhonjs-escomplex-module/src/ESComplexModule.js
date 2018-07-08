import ASTWalker           from 'typhonjs-ast-walker/src/ASTWalker';
import ModuleScopeControl  from 'typhonjs-escomplex-commons/src/module/report/control/ModuleScopeControl';

import Plugins             from './Plugins';

/**
 * Provides a runtime to invoke ESComplexModule plugins for processing / metrics calculations of independent modules.
 */
export default class ESComplexModule
{
   /**
    * Initializes ESComplexModule.
    *
    * @param {object}   options - module options including user plugins to load including:
    * ```
    * (boolean)         loadDefaultPlugins - When false ESComplexModule will not load any default plugins.
    * (Array<Object>)   plugins - A list of ESComplexModule plugins that have already been instantiated.
    * ```
    */
   constructor(options = {})
   {
      /* istanbul ignore if */
      if (typeof options !== 'object') { throw new TypeError('ctor error: `options` is not an `object`.'); }

      /**
       * Provides dispatch methods to all module plugins.
       * @type {Plugins}
       * @private
       */
      this._plugins = new Plugins(options);
   }

   /**
    * Processes the given ast and calculates metrics via plugins.
    *
    * @param {object|Array}   ast - Javascript AST.
    * @param {object}         options - (Optional) module analyze options.
    *
    * @returns {ModuleReport} - A single module report.
    */
   analyze(ast, options = {})
   {
      if (typeof ast !== 'object' || Array.isArray(ast))
      {
         throw new TypeError('analyze error: `ast` is not an `object` or `array`.');
      }

      /* istanbul ignore if */
      if (typeof options !== 'object') { throw new TypeError('analyze error: `options` is not an `object`.'); }

      const settings = this._plugins.onConfigure(options);

      const syntaxes = this._plugins.onLoadSyntax(settings);

      const moduleReport = this._plugins.onModuleStart(ast, syntaxes, settings);

      const scopeControl = new ModuleScopeControl(moduleReport);

      // Completely traverse the provided AST and defer to plugins to process node traversal.
      new ASTWalker().traverse(ast,
      {
         enterNode: (node, parent) =>
         {
            const syntax = syntaxes[node.type];

            let ignoreKeys = [];

            // Process node syntax / ignore keys.
            if (typeof syntax === 'object')
            {
               if (syntax.ignoreKeys)
               {
                  ignoreKeys = syntax.ignoreKeys.valueOf(node, parent);
               }
            }

            ignoreKeys = this._plugins.onEnterNode(moduleReport, scopeControl, ignoreKeys, syntaxes, settings, node,
             parent);

            // Process node syntax / create scope.
            if (typeof syntax === 'object')
            {
               if (syntax.ignoreKeys)
               {
                  ignoreKeys = syntax.ignoreKeys.valueOf(node, parent);
               }

               if (syntax.newScope)
               {
                  const newScope = syntax.newScope.valueOf(node, parent);

                  if (newScope)
                  {
                     scopeControl.createScope(newScope);
                     this._plugins.onModuleScopeCreated(moduleReport, scopeControl, newScope);
                  }
               }
            }

            return ignoreKeys;
         },

         exitNode: (node, parent) =>
         {
            const syntax = syntaxes[node.type];

            // Process node syntax / pop scope.
            if (typeof syntax === 'object' && syntax.newScope)
            {
               const newScope = syntax.newScope.valueOf(node, parent);

               if (newScope)
               {
                  scopeControl.popScope(newScope);
                  this._plugins.onModuleScopePopped(moduleReport, scopeControl, newScope);
               }
            }

            return this._plugins.onExitNode(moduleReport, scopeControl, syntaxes, settings, node, parent);
         }
      });

      // Allow all plugins to have a calculation pass at the module report.
      this._plugins.onModuleCalculate(moduleReport, syntaxes, settings);

      // Allow all plugins to have a pass at the module report to calculate any averaged data.
      this._plugins.onModuleAverage(moduleReport, syntaxes, settings);

      // Allow all plugins to have a pass at the module report to calculate any metrics that depend on averaged data.
      this._plugins.onModulePostAverage(moduleReport, syntaxes, settings);

      // Allow all plugins to clean up any resources as necessary.
      this._plugins.onModuleEnd(moduleReport, syntaxes, settings);

      return moduleReport.finalize();
   }

   // Asynchronous Promise based methods ----------------------------------------------------------------------------

   /**
    * Wraps in a Promise processing the given ast and calculates metrics via plugins.
    *
    * @param {object|Array}   ast - Javascript AST.
    * @param {object}         options - (Optional) module analyze options.
    *
    * @returns {Promise<ModuleReport>} - A single module report.
    */
   analyzeAsync(ast, options = {})
   {
      return new Promise((resolve, reject) =>
      {
         try { resolve(this.analyze(ast, options)); }
         catch (err) { /* istanbul ignore next */ reject(err); }
      });
   }
}
