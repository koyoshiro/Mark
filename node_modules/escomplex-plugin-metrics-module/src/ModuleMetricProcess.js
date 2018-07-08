import HalsteadArray from 'typhonjs-escomplex-commons/src/module/traits/HalsteadArray';

/**
 * Provides the main processing of syntax data for all default metrics gathered.
 */
export default class ModuleMetricProcess
{
   /**
    * Potentially adds given dependencies for tracking.
    *
    * @param {ModuleReport}         moduleReport - The ModuleReport being processed.
    * @param {object|Array<object>} dependencies - Dependencies to add.
    */
   static addDependencies(moduleReport, dependencies)
   {
      if (typeof dependencies === 'object' || Array.isArray(dependencies))
      {
         moduleReport.dependencies = moduleReport.dependencies.concat(dependencies);
      }
   }

   /**
    * Creates a moduleReport scope when a class or method is entered.
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
   static createScope(moduleReport, scopeControl, newScope = {})
   {
      if (typeof newScope !== 'object') { throw new TypeError(`createScope error: 'newScope' is not an 'object'.`); }

      if (typeof newScope.type !== 'string')
      {
         throw new TypeError(`createScope error: 'newScope.type' is not a 'string'.`);
      }

      if (typeof newScope.name !== 'string')
      {
         throw new TypeError(`createScope error: 'newScope.name' is not a 'string'.`);
      }

      if (!Number.isInteger(newScope.lineStart))
      {
         throw new TypeError(`createScope error: 'newScope.lineStart' is not an 'integer'.`);
      }

      if (!Number.isInteger(newScope.lineEnd))
      {
         throw new TypeError(`createScope error: 'newScope.lineEnd' is not an 'integer'.`);
      }

      switch (newScope.type)
      {
         case 'class':
            break;

         case 'method':
         {
            if (!Number.isInteger(newScope.paramCount))
            {
               throw new TypeError(`createScope error: 'newScope.paramCount' is not an 'integer'.`);
            }

            // Increments the associated aggregate moduleReport parameter count.
            moduleReport.aggregateMethodReport.params += newScope.paramCount;

            const classReport = scopeControl.getCurrentClassReport();

            // Increments current class report associated aggregate report parameter count.
            if (classReport) { classReport.aggregateMethodReport.params += newScope.paramCount; }

            break;
         }
      }
   }

   /**
    * Increments the Halstead `metric` for the given `identifier` for the ModuleReport and any current class or method
    * report being tracked.
    *
    * @param {ModuleReport}         moduleReport - The ModuleReport being processed.
    * @param {ModuleScopeControl}   scopeControl - The associated module report scope control.
    * @param {string}               metric - A Halstead metric name.
    * @param {string}               identifier - A Halstead identifier name.
    */
   static halsteadItemEncountered(moduleReport, scopeControl, metric, identifier)
   {
      const currentClassReport = scopeControl.getCurrentClassReport();
      const currentMethodReport = scopeControl.getCurrentMethodReport();

      ModuleMetricProcess.incrementHalsteadItems(moduleReport, metric, identifier);

      if (currentClassReport) { ModuleMetricProcess.incrementHalsteadItems(currentClassReport, metric, identifier); }

      if (currentMethodReport) { ModuleMetricProcess.incrementHalsteadItems(currentMethodReport, metric, identifier); }
   }


   /**
    * Increments the cyclomatic metric for the ModuleReport and any current class or method report being tracked.
    *
    * @param {ModuleReport}         moduleReport - The ModuleReport being processed.
    * @param {ModuleScopeControl}   scopeControl - The associated module report scope control.
    * @param {number}   amount - Amount to increment.
    */
   static incrementCyclomatic(moduleReport, scopeControl, amount)
   {
      const currentClassReport = scopeControl.getCurrentClassReport();
      const currentMethodReport = scopeControl.getCurrentMethodReport();

      moduleReport.methodAggregate.cyclomatic += amount;

      if (currentClassReport) { currentClassReport.methodAggregate.cyclomatic += amount; }
      if (currentMethodReport) { currentMethodReport.cyclomatic += amount; }
   }

   /**
    * Increments the logical SLOC (source lines of code) metric for the ModuleReport and any current class or method
    * report being tracked.
    *
    * @param {ModuleReport}         moduleReport - The ModuleReport being processed.
    * @param {ModuleScopeControl}   scopeControl - The associated module report scope control.
    * @param {number}   amount - Amount to increment.
    */
   static incrementLogicalSloc(moduleReport, scopeControl, amount)
   {
      const currentClassReport = scopeControl.getCurrentClassReport();
      const currentMethodReport = scopeControl.getCurrentMethodReport();

      moduleReport.methodAggregate.sloc.logical += amount;

      if (currentClassReport) { currentClassReport.methodAggregate.sloc.logical += amount; }
      if (currentMethodReport) { currentMethodReport.sloc.logical += amount; }
   }

   /**
    * Increments the associated aggregate report Halstead items including distinct and total counts.
    *
    * @param {ModuleReport}   moduleReport - The ModuleReport being processed.
    * @param {string}         metric - A Halstead metric name.
    * @param {string}         identifier - A Halstead identifier name.
    */
   static incrementHalsteadItems(moduleReport, metric, identifier)
   {
      // Increments the associated aggregate report HalsteadData for distinct identifiers.
      if (moduleReport.aggregateMethodReport.halstead[metric].identifiers.indexOf(identifier) === -1)
      {
         moduleReport.aggregateMethodReport.halstead[metric].identifiers.push(identifier);
         moduleReport.aggregateMethodReport.halstead[metric]['distinct'] += 1;
      }

      // Increment total halstead items
      moduleReport.aggregateMethodReport.halstead[metric]['total'] += 1;
   }

   /**
    * Processes all TraitHalstead identifier data.
    *
    * @param {ModuleReport}         moduleReport - The ModuleReport being processed.
    * @param {ModuleScopeControl}   scopeControl - The associated module report scope control.
    * @param {object}               syntax - The associated syntax being processed for current node.
    * @param {object}               node - The node being entered.
    * @param {object}               parent - The parent node of the node being entered.
    */
   static processSyntax(moduleReport, scopeControl, syntax, node, parent)
   {
      for (const key in syntax)
      {
         switch (syntax[key].metric)
         {
            case 'cyclomatic':
               ModuleMetricProcess.incrementCyclomatic(moduleReport, scopeControl, syntax[key].valueOf(node, parent));
               break;

            case 'dependencies':
               ModuleMetricProcess.addDependencies(moduleReport, syntax[key].valueOf(node, parent));
               break;

            case 'lloc':
               ModuleMetricProcess.incrementLogicalSloc(moduleReport, scopeControl, syntax[key].valueOf(node, parent));
               break;
         }

         // Process operands / operators HalsteadArray entries.
         if (syntax[key] instanceof HalsteadArray)
         {
            const identifiers = syntax[key].valueOf(node, parent);

            identifiers.forEach((identifier) =>
            {
               ModuleMetricProcess.halsteadItemEncountered(moduleReport, scopeControl, syntax[key].metric, identifier);
            });
         }
      }
   }
}
