import ProjectMetricAverage   from './ProjectMetricAverage';
import ProjectMetricCalculate from './ProjectMetricCalculate';

/**
 * Provides default project metrics gathering and calculation.
 *
 * @see https://en.wikipedia.org/wiki/Adjacency_matrix
 * @see https://en.wikipedia.org/wiki/Distance_matrix
 * @see https://en.wikipedia.org/wiki/Floyd%E2%80%93Warshall_algorithm
 */
export default class PluginMetricsProject
{
   /**
    * Loads any default settings that are not already provided by any user options.
    *
    * @param {object}   ev - escomplex plugin event data.
    *
    * The following options are:
    * ```
    * (boolean)   noCoreSize - Boolean indicating whether the visibility list is not calculated; default (false).
    * ```
    */
   onConfigure(ev)
   {
      ev.data.settings.noCoreSize = typeof ev.data.options.noCoreSize === 'boolean' ?
       ev.data.options.noCoreSize : false;
   }

   /**
    * Performs average calculations based on collected report data.
    *
    * @param {object}   ev - escomplex plugin event data.
    */
   onProjectAverage(ev)
   {
      ProjectMetricAverage.calculate(ev.data.projectReport);
   }

   /**
    * Performs initial calculations based on collected report data.
    *
    * @param {object}   ev - escomplex plugin event data.
    */
   onProjectCalculate(ev)
   {
      ProjectMetricCalculate.calculate(ev.data.projectReport, ev.data.pathModule, ev.data.settings);
   }
}
