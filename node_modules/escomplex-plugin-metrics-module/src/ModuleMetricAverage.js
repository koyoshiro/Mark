import ObjectUtil from 'typhonjs-escomplex-commons/src/utils/ObjectUtil';

/**
 * Provides a typhonjs-escomplex-module / ESComplexModule plugin which gathers and calculates all default metrics.
 *
 * @see https://www.npmjs.com/package/typhonjs-escomplex-commons
 * @see https://www.npmjs.com/package/typhonjs-escomplex-module
 */
export default class ModuleMetricAverage
{
   /**
    * Coordinates calculating all metrics. All module and class methods are traversed. If there are no module or class
    * methods respectively the aggregate MethodReport is used for calculations.
    *
    * @param {ModuleReport}   moduleReport - The ModuleReport being processed.
    * @param {object}         settings - Settings for module processing.
    *
    * @private
    */
   static calculate(moduleReport)
   {
      let moduleMethodCount = moduleReport.methods.length;
      const moduleMethodAverages = moduleReport.methodAverage;
      const moduleMethodAverageKeys = ObjectUtil.getAccessorList(moduleMethodAverages);

      // Handle module methods.
      moduleReport.methods.forEach((methodReport) =>
      {
         moduleMethodAverageKeys.forEach((averageKey) =>
         {
            const targetValue = ObjectUtil.safeAccess(methodReport, averageKey, 0);
            ObjectUtil.safeSet(moduleMethodAverages, averageKey, targetValue, 'add');
         });
      });

      // Handle module class reports.
      moduleReport.classes.forEach((classReport) =>
      {
         const classMethodAverages = classReport.methodAverage;

         let classMethodCount = classReport.methods.length;
         moduleMethodCount += classMethodCount;

         // Process all class methods.
         classReport.methods.forEach((methodReport) =>
         {
            moduleMethodAverageKeys.forEach((averageKey) =>
            {
               const targetValue = ObjectUtil.safeAccess(methodReport, averageKey, 0);

               ObjectUtil.safeSet(moduleMethodAverages, averageKey, targetValue, 'add');
               ObjectUtil.safeSet(classMethodAverages, averageKey, targetValue, 'add');
            });
         });

         // If there are no class methods use the class aggregate MethodReport.
         if (classMethodCount === 0)
         {
            // Sane handling of classes that contain no methods.
            moduleMethodAverageKeys.forEach((averageKey) =>
            {
               const targetValue = ObjectUtil.safeAccess(classReport.aggregateMethodReport, averageKey, 0);

               ObjectUtil.safeSet(classMethodAverages, averageKey, targetValue, 'add');
            });

            classMethodCount = 1;
         }

         moduleMethodAverageKeys.forEach((averageKey) =>
         {
            ObjectUtil.safeSet(classMethodAverages, averageKey, classMethodCount, 'div');
         });
      });

      // If there are no module methods use the module aggregate MethodReport.
      if (moduleMethodCount === 0)
      {
         // Sane handling of classes that contain no methods.
         moduleMethodAverageKeys.forEach((averageKey) =>
         {
            const targetValue = ObjectUtil.safeAccess(moduleReport.aggregateMethodReport, averageKey, 0);

            ObjectUtil.safeSet(moduleMethodAverages, averageKey, targetValue, 'add');
         });

         // Sane handling of modules that contain no methods.
         moduleMethodCount = 1;
      }

      moduleMethodAverageKeys.forEach((averageKey) =>
      {
         ObjectUtil.safeSet(moduleMethodAverages, averageKey, moduleMethodCount, 'div');
      });
   }
}
