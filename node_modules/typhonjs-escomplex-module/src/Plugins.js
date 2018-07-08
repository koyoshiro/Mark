import PluginMetricsModule from 'escomplex-plugin-metrics-module/src/PluginMetricsModule';
import PluginSyntaxBabylon from 'escomplex-plugin-syntax-babylon/src/PluginSyntaxBabylon';

import ModuleReport        from 'typhonjs-escomplex-commons/src/module/report/ModuleReport';

import PluginManager       from 'typhonjs-plugin-manager/src/PluginManager';

/**
 * Provides a wrapper around PluginManager for ESComplexModule. Several convenience methods for the plugin callbacks
 * properly manage and or create initial data that are processed by the plugins.
 *
 * The default plugins loaded include:
 * @see https://www.npmjs.com/package/escomplex-plugin-metrics-module
 * @see https://www.npmjs.com/package/escomplex-plugin-syntax-babylon
 */
export default class Plugins
{
   /**
    * Initializes Plugins.
    *
    * @param {object}   options - module options including user plugins to load including:
    * ```
    * (boolean)         loadDefaultPlugins - When false ESComplexModule will not load any default plugins.
    * (Array<Object>)   plugins - A list of ESComplexModule plugins that have already been instantiated.
    * ```
    */
   constructor(options = {})
   {
      /**
       * Provides a generic plugin manager for dispatching events to module plugins.
       * @type {PluginManager}
       * @private
       */
      this._pluginManager = new PluginManager();

      if (typeof options.loadDefaultPlugins === 'boolean' && !options.loadDefaultPlugins) { /* nop */ }
      else
      {
         this._pluginManager.addPlugin(new PluginSyntaxBabylon());
         this._pluginManager.addPlugin(new PluginMetricsModule());
      }
   }

   /**
    * Initializes the default `settings` object hash and then invokes the `onConfigure` plugin callback for all loaded
    * plugins.
    *
    * @param {object}   options - (Optional) module processing options.
    *
    * @returns {object}
    */
   onConfigure(options)
   {
      let settings = {};
      const event = this._pluginManager.invoke('onConfigure', { options, settings }, true);
      settings = event !== null ? event.data.settings : settings;
      Object.freeze(settings);
      return event !== null ? event.data.settings : settings;
   }

   /**
    * Invokes the `onEnterNode` plugin callback during AST traversal when a node is entered.
    *
    * @param {ModuleReport}         moduleReport - The ModuleReport being processed.
    * @param {ModuleScopeControl}   scopeControl - The associated module report scope control.
    * @param {Array<string>}        ignoreKeys - Any syntax assigned ignore keys for AST traversal.
    * @param {object}               syntaxes - All loaded trait syntaxes for AST nodes.
    * @param {object}               settings - Settings for module processing.
    * @param {object}               node - The node being entered.
    * @param {object}               parent - The parent node of the node being entered.
    *
    * @returns {Array<string>|null} - A directive indicating children keys to be skipped or if null all keys entirely.
    */
   onEnterNode(moduleReport, scopeControl, ignoreKeys, syntaxes, settings, node, parent)
   {
      const event = this._pluginManager.invoke('onEnterNode',
       { moduleReport, scopeControl, ignoreKeys, syntaxes, settings, node, parent }, false);

      return event !== null ? event.data.ignoreKeys : [];
   }

   /**
    * Invokes the `onExitNode` plugin callback during AST traversal when a node is exited.
    *
    * @param {ModuleReport}         moduleReport - The ModuleReport being processed.
    * @param {ModuleScopeControl}   scopeControl - The associated module report scope control.
    * @param {object}               syntaxes - All loaded trait syntaxes for AST nodes.
    * @param {object}               settings - Settings for module processing.
    * @param {object}               node - The node being entered.
    * @param {object}               parent - The parent node of the node being entered.
    */
   onExitNode(moduleReport, scopeControl, syntaxes, settings, node, parent)
   {
      this._pluginManager.invoke('onExitNode', { moduleReport, scopeControl, syntaxes, settings, node, parent }, false);
   }

   /**
    * Initializes the trait `syntaxes` object hash and then invokes the `onLoadSyntax` plugin callback for all loaded
    * plugins.
    *
    * @param {object}   settings - Settings for module processing.
    *
    * @returns {object} - Loaded trait `syntaxes` for AST nodes.
    */
   onLoadSyntax(settings)
   {
      const syntaxes = {};
      const event = this._pluginManager.invoke('onLoadSyntax', { settings, syntaxes }, true);
      return event !== null ? event.data.syntaxes : syntaxes;
   }

   /**
    * Initializes the default ModuleReport and then invokes the `onModuleStart` plugin callback for all loaded plugins.
    *
    * @param {object}   ast - Settings for module processing.
    * @param {object}   syntaxes - All loaded trait syntaxes for AST nodes.
    * @param {object}   settings - Settings for module processing.
    *
    * @returns {ModuleReport} - The ModuleReport being processed.
    */
   onModuleStart(ast, syntaxes, settings)
   {
      const moduleReport = new ModuleReport(ast.loc.start.line, ast.loc.end.line, settings);
      this._pluginManager.invoke('onModuleStart', { ast, moduleReport, syntaxes, settings }, false);
      return moduleReport;
   }

   /**
    * Invokes the `onModuleAverage` plugin callback for all loaded plugins such they might average any calculated
    * results.
    *
    * @param {ModuleReport}   moduleReport - The ModuleReport being processed.
    * @param {object}         syntaxes - All loaded trait syntaxes for AST nodes.
    * @param {object}         settings - Settings for module processing.
    *
    * @returns {ModuleReport} - The ModuleReport being processed.
    */
   onModuleAverage(moduleReport, syntaxes, settings)
   {
      this._pluginManager.invoke('onModuleAverage', { moduleReport, syntaxes, settings }, false);
      return moduleReport;
   }

   /**
    * Invokes the `onModuleCalculate` plugin callback for all loaded plugins such they might finish calculating results.
    *
    * @param {ModuleReport}   moduleReport - The ModuleReport being processed.
    * @param {object}         syntaxes - All loaded trait syntaxes for AST nodes.
    * @param {object}         settings - Settings for module processing.
    *
    * @returns {ModuleReport} - The ModuleReport being processed.
    */
   onModuleCalculate(moduleReport, syntaxes, settings)
   {
      this._pluginManager.invoke('onModuleCalculate', { moduleReport, syntaxes, settings }, false);
      return moduleReport;
   }

   /**
    * Invokes the `onModuleEnd` plugin callback for all loaded plugins at the end of module processing.
    *
    * @param {ModuleReport}   moduleReport - The ModuleReport being processed.
    * @param {object}         syntaxes - All loaded trait syntaxes for AST nodes.
    * @param {object}         settings - Settings for module processing.
    *
    * @returns {ModuleReport} - The ModuleReport being processed.
    */
   onModuleEnd(moduleReport, syntaxes, settings)
   {
      this._pluginManager.invoke('onModuleEnd', { moduleReport, syntaxes, settings }, false);
      return moduleReport;
   }

   /**
    * Invokes the `onModulePostAverage` plugin callback for all loaded plugins such they might finish any calculations
    * that involve averaged results.
    *
    * @param {ModuleReport}   moduleReport - The ModuleReport being processed.
    * @param {object}         syntaxes - All loaded trait syntaxes for AST nodes.
    * @param {object}         settings - Settings for module processing.
    *
    * @returns {ModuleReport} - The ModuleReport being processed.
    */
   onModulePostAverage(moduleReport, syntaxes, settings)
   {
      this._pluginManager.invoke('onModulePostAverage', { moduleReport, syntaxes, settings }, false);
      return moduleReport;
   }

   /**
    * Invokes the `onModuleScopeCreated` plugin callback during AST traversal when a new module report scope is created.
    *
    * @param {ModuleReport}         moduleReport - The ModuleReport being processed.
    * @param {ModuleScopeControl}   scopeControl - The associated module report scope control.
    * @param {object}               newScope - An object hash defining the new scope including:
    * ```
    * (string) type - Type of report to create.
    * (string) name - Name of the class or method.
    * (number) lineStart - Start line of method.
    * (number) lineEnd - End line of method.
    * (number) paramCount - (For method scopes) Number of parameters for method.
    * ```
    */
   onModuleScopeCreated(moduleReport, scopeControl, newScope)
   {
      this._pluginManager.invoke('onModuleScopeCreated', { moduleReport, scopeControl, newScope }, false);
   }

   /**
    * Invokes the `onModuleScopePopped` plugin callback during AST traversal when a module report scope is
    * popped / exited.
    *
    * @param {ModuleReport}         moduleReport - The ModuleReport being processed.
    * @param {ModuleScopeControl}   scopeControl - The associated module report scope control.
    * @param {object}               scope - An object hash defining the new scope including:
    * ```
    * (string) type - Type of report to pop.
    * ```
    */
   onModuleScopePopped(moduleReport, scopeControl, scope)
   {
      this._pluginManager.invoke('onModuleScopePopped', { moduleReport, scopeControl, scope }, false);
   }
}
