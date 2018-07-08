import ObjectUtil from 'typhonjs-escomplex-commons/src/utils/ObjectUtil';

export default class ProjectMetricCalculate
{
   /**
    * Calculates average ModuleReport metrics that are applicable to ProjectReport.
    *
    * @param {object}   projectReport - The project report being processed.
    *
    * @private
    */
   static calculate(projectReport)
   {
      const divisor = projectReport.modules.length === 0 ? 1 : projectReport.modules.length;

      const moduleAverage = projectReport.moduleAverage;
      const moduleAverageKeys = ObjectUtil.getAccessorList(moduleAverage);

      // Defer to ModuleReport to sum all relevant module metrics applicable to ProjectResult.
      projectReport.modules.forEach((module) =>
      {
         moduleAverageKeys.forEach((averageKey) =>
         {
            const targetValue = ObjectUtil.safeAccess(module, averageKey, 0);
            ObjectUtil.safeSet(moduleAverage, averageKey, targetValue, 'add');
         });
      });

      moduleAverageKeys.forEach((averageKey) =>
      {
         ObjectUtil.safeSet(moduleAverage, averageKey, divisor, 'div');
      });
   }
}
