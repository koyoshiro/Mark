/**
 * Provides a typhonjs-escomplex-module / ESComplexModule plugin which gathers and calculates all default metrics.
 *
 * @see https://www.npmjs.com/package/typhonjs-escomplex-commons
 * @see https://www.npmjs.com/package/typhonjs-escomplex-module
 */
export default class ModuleMetricCalculate
{
   /**
    * Coordinates calculating all metrics. All module and class methods are traversed. If there are no module or class
    * methods respectively the aggregate MethodReport is used for calculations.
    *
    * @param {ModuleReport}   moduleReport - The ModuleReport being processed.
    *
    * @private
    */
   static calculate(moduleReport)
   {
      // Handle module methods.
      moduleReport.methods.forEach((methodReport) =>
      {
         ModuleMetricCalculate.calculateCyclomaticDensity(methodReport);
         ModuleMetricCalculate.calculateHalsteadMetrics(methodReport.halstead);
      });

      // Handle module class reports.
      moduleReport.classes.forEach((classReport) =>
      {
         // Process all class methods.
         classReport.methods.forEach((methodReport) =>
         {
            ModuleMetricCalculate.calculateCyclomaticDensity(methodReport);
            ModuleMetricCalculate.calculateHalsteadMetrics(methodReport.halstead);
         });

         ModuleMetricCalculate.calculateCyclomaticDensity(classReport.aggregateMethodReport);
         ModuleMetricCalculate.calculateHalsteadMetrics(classReport.aggregateMethodReport.halstead);
      });

      ModuleMetricCalculate.calculateCyclomaticDensity(moduleReport.aggregateMethodReport);
      ModuleMetricCalculate.calculateHalsteadMetrics(moduleReport.aggregateMethodReport.halstead);
   }

   /**
    * Calculates cyclomatic density - Proposed as a modification to cyclomatic complexity by Geoffrey K. Gill and
    * Chris F. Kemerer in 1991, this metric simply re-expresses it as a percentage of the logical lines of code. Lower
    * is better.
    *
    * @param {AggregateMethodReport}   report - An AggregateMethodReport to perform calculations on.
    *
    * @private
    */
   static calculateCyclomaticDensity(report)
   {
      report.cyclomaticDensity = report.sloc.logical === 0 ? 0 : (report.cyclomatic / report.sloc.logical) * 100;
   }

   /**
    * Calculates Halstead metrics. In 1977, Maurice Halstead developed a set of metrics which are calculated based on
    * the number of distinct operators, the number of distinct operands, the total number of operators and the total
    * number of operands in each function. This site picks out three Halstead measures in particular: difficulty,
    * volume and effort.
    *
    * @param {HalsteadData}   halstead - A HalsteadData instance to perform calculations on.
    *
    * @see https://en.wikipedia.org/wiki/Halstead_complexity_measures
    *
    * @private
    */
   static calculateHalsteadMetrics(halstead)
   {
      halstead.length = halstead.operators.total + halstead.operands.total;

      /* istanbul ignore if */
      if (halstead.length === 0)
      {
         halstead.reset();
      }
      else
      {
         halstead.vocabulary = halstead.operators.distinct + halstead.operands.distinct;
         halstead.difficulty = (halstead.operators.distinct / 2)
          * (halstead.operands.distinct === 0 ? 1 : halstead.operands.total / halstead.operands.distinct);
         halstead.volume = halstead.length * (Math.log(halstead.vocabulary) / Math.log(2));
         halstead.effort = halstead.difficulty * halstead.volume;
         halstead.bugs = halstead.volume / 3000;
         halstead.time = halstead.effort / 18;
      }
   }
}
