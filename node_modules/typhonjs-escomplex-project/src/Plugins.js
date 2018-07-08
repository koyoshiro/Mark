import PluginManager          from 'typhonjs-plugin-manager/src/PluginManager';

import PluginMetricsProject   from 'escomplex-plugin-metrics-project/src/PluginMetricsProject';

/**
 * Provides a wrapper around PluginManager for ESComplexProject. Several convenience methods for the plugin callbacks
 * properly manage and or create initial data that are processed by the plugins.
 *
 * The default plugins loaded include:
 * @see https://www.npmjs.com/package/escomplex-plugin-metrics-project
 */
export default class Plugins
{
   /**
    * Initializes Plugins.
    *
    * @param {object}   options - module options including user plugins to load including:
    * ```
    * (boolean)         loadDefaultPlugins - When false ESComplexProject will not load any default plugins.
    * (Array<Object>)   plugins - A list of ESComplexProject plugins that have already been instantiated.
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
         this._pluginManager.addPlugin(new PluginMetricsProject());
      }
   }

   /**
    * Initializes the default `settings` object hash and then invokes the `onConfigure` plugin callback for all loaded
    * plugins.
    *
    * @param {object}   options - (Optional) project processing options.
    *
    * @returns {object}
    */
   onConfigure(options)
   {
      /**
       * Default settings with potential user override of `serializeModules` and `skipCalculation`.
       * @type {{serializeModules: boolean, skipCalculation: boolean}}
       */
      const settings =
      {
         serializeModules: typeof options.serializeModules === 'boolean' ? options.serializeModules : true,
         skipCalculation: typeof options.skipCalculation === 'boolean' ? options.skipCalculation : false
      };

      const event = this._pluginManager.invoke('onConfigure', { options, settings }, true);
      return event !== null ? event.data.settings : settings;
   }

   /**
    * Invokes the `onProjectAverage` plugin callback for all loaded plugins such they might average any calculated
    * results.
    *
    * @param {ProjectReport}  projectReport - An instance of ProjectReport.
    * @param {object}         pathModule - Provides an object which matches the Node path module.
    * @param {object}         settings - Settings for project processing.
    *
    * @returns {ProjectReport}
    */
   onProjectAverage(projectReport, pathModule, settings)
   {
      const event = this._pluginManager.invoke('onProjectAverage', { projectReport, pathModule, settings }, false);
      return event !== null ? event.data.projectReport : projectReport;
   }

   /**
    * Invokes the `onProjectCalculate` plugin callback for all loaded plugins such they might finish calculating
    * results.
    *
    * @param {ProjectReport}  projectReport - An instance of ProjectReport.
    * @param {object}         pathModule - Provides an object which matches the Node path module.
    * @param {object}         settings - Settings for project processing.
    *
    * @returns {ProjectReport}
    */
   onProjectCalculate(projectReport, pathModule, settings)
   {
      const event = this._pluginManager.invoke('onProjectCalculate', { projectReport, pathModule, settings }, false);
      return event !== null ? event.data.projectReport : projectReport;
   }

   /**
    * Invokes the `onProjectEnd` plugin callback for all loaded plugins at the end of module processing.
    *
    * @param {ProjectReport}  projectReport - An instance of ProjectReport.
    * @param {object}         pathModule - Provides an object which matches the Node path module.
    * @param {object}         settings - Settings for project processing.
    *
    * @returns {ProjectReport}
    */
   onProjectEnd(projectReport, pathModule, settings)
   {
      const event = this._pluginManager.invoke('onProjectEnd', { projectReport, pathModule, settings }, false);
      return event !== null ? event.data.projectReport : projectReport;
   }

   /**
    * Invokes the `onProjectPostAverage` plugin callback for all loaded plugins such they might finish any calculations
    * that involve averaged results.
    *
    * @param {ProjectReport}  projectReport - An instance of ProjectReport.
    * @param {object}         pathModule - Provides an object which matches the Node path module.
    * @param {object}         settings - Settings for project processing.
    *
    * @returns {ProjectReport}
    */
   onProjectPostAverage(projectReport, pathModule, settings)
   {
      const event = this._pluginManager.invoke('onProjectPostAverage', { projectReport, pathModule, settings }, false);
      return event !== null ? event.data.projectReport : projectReport;
   }

   /**
    * Initializes the default `report` object hash and then invokes the `onProjectStart` plugin callback for all loaded
    * plugins.
    *
    * @param {object}   pathModule - Provides an object which matches the Node path module.
    * @param {object}   settings - Settings for project processing.
    */
   onProjectStart(pathModule, settings)
   {
      this._pluginManager.invoke('onProjectStart', { pathModule, settings }, false);
   }
}
