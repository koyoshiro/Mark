import AbstractReport         from './AbstractReport';
import AggregateMethodReport  from './AggregateMethodReport';
import ClassReport            from './ClassReport';
import MethodAverage          from './averages/MethodAverage';
import ModuleMethodReport     from './ModuleMethodReport';

import AnalyzeError           from '../../analyze/AnalyzeError';
import MathUtil               from '../../utils/MathUtil';
import ObjectUtil             from '../../utils/ObjectUtil';
import ReportType             from '../../types/ReportType';
import TransformFormat        from '../../transform/TransformFormat';

/**
 * Provides the module report object which stores data pertaining to a single file / module being processed.
 *
 * All ES Module classes are stored in the `classes` member variable as ClassReports. Methods that are not part of a
 * class are stored as ModuleMethodReport instances in the `methods` member variable.
 *
 * Various helper methods found in ModuleReport and AbstractReport help increment associated data during collection.
 */
export default class ModuleReport extends AbstractReport
{
   /**
    * Returns the enum for the report type.
    * @returns {ReportType}
    */
   get type() { return ReportType.MODULE; }

   /**
    * Initializes the report.
    *
    * @param {number}   lineStart - Start line of file / module.
    *
    * @param {number}   lineEnd - End line of file / module.
    *
    * @param {object}   settings - An object hash of the settings used in generating this report via ESComplexModule.
    */
   constructor(lineStart = 0, lineEnd = 0, settings = {})
   {
      super(new AggregateMethodReport(lineStart, lineEnd));

      /**
       * Stores the settings used to generate the module report.
       * @type {object}
       */
      this.settings = typeof settings === 'object' ? Object.assign({}, settings) : {};

      /**
       * Stores all ClassReport data for the module.
       * @type {Array<ClassReport>}
       */
      this.classes = [];

      /**
       * Stores all parsed dependencies.
       * @type {Array}
       */
      this.dependencies = [];

      /**
       * Stores any analysis errors.
       * @type {Array}
       */
      this.errors = [];

      /**
       * Stores the file path of the module / file. The file path is only defined as supplied when processing projects.
       * @type {string}
       */
      this.filePath = void 0;

      /**
       * Stores the end line for the module / file.
       * @type {number}
       */
      this.lineEnd = lineEnd;

      /**
       * Stores the start line for the module / file.
       * @type {number}
       */
      this.lineStart = lineStart;

      /**
       * Measures the average method maintainability index for the module / file.
       * @type {number}
       */
      this.maintainability = 0;

      /**
       * Stores all module ModuleMethodReport data found outside of any ES6 classes.
       * @type {Array<ModuleMethodReport>}
       */
      this.methods = [];

      /**
       * Stores the average method metric data.
       * @type {MethodAverage}
       */
      this.methodAverage = new MethodAverage();

      /**
       * Stores the active source path of the module / file. This path is respective of how the file is referenced in
       * the source code itself. `srcPath` is only defined as supplied when processing projects.
       * @type {string}
       */
      this.srcPath = void 0;

      /**
       * Stores the active source path alias of the module / file. This path is respective of how the file is
       * referenced in the source code itself when aliased including NPM and JSPM modules which provide a `main` entry.
       * `srcPathAlias` is only defined as supplied when processing projects.
       * @type {string}
       */
      this.srcPathAlias = void 0;
   }

   /**
    * Clears all errors stored in the module report and by default any class reports and module methods.
    *
    * @param {boolean}  clearChildren - (Optional) If false then class and module method errors are not cleared;
    *                                   default (true).
    */
   clearErrors(clearChildren = true)
   {
      this.errors = [];

      if (clearChildren)
      {
         this.classes.forEach((report) => { report.clearErrors(); });
         this.methods.forEach((report) => { report.clearErrors(); });
      }
   }

   /**
    * Cleans up any house keeping member variables.
    *
    * @returns {ModuleReport}
    */
   finalize()
   {
      return MathUtil.toFixedTraverse(this);
   }

   /**
    * Gets all errors stored in the module report and by default any module methods and class reports.
    *
    * @param {object}   options - Optional parameters.
    * @property {boolean}  includeChildren - If false then module errors are not included; default (true).
    * @property {boolean}  includeReports - If true then results will be an array of object hashes containing `source`
    *                                      (the source report object of the error) and `error`
    *                                      (an AnalyzeError instance) keys; default (false).
    *
    * @returns {Array<AnalyzeError|{error: AnalyzeError, source: *}>}
    */
   getErrors(options = { includeChildren: true, includeReports: false })
   {
      /* istanbul ignore if */
      if (typeof options !== 'object') { throw new TypeError(`getErrors error: 'options' is not an 'object'.`); }

      // By default set includeChildren to true.
      /* istanbul ignore if */
      if (typeof options.includeChildren !== 'boolean') { options.includeChildren = true; }

      // If `includeReports` is true then return an object hash with the source and error otherwise return the error.
      let errors = options.includeReports ? this.errors.map((entry) => { return { error: entry, source: this }; }) :
       [].concat(...this.errors);

      // If `includeChildren` is true then traverse all children reports for errors.
      if (options.includeChildren)
      {
         // Add module to all children errors.
         if (options.includeReports)
         {
            const childErrors = [];

            this.methods.forEach((report) => { childErrors.push(...report.getErrors(options)); });
            this.classes.forEach((report) => { childErrors.push(...report.getErrors(options)); });

            // Add module to object hash.
            childErrors.forEach((error) => { error.module = this; });

            // Push to all module errors.
            errors.push(...childErrors);
         }
         else
         {
            this.methods.forEach((report) => { errors.push(...report.getErrors(options)); });
            this.classes.forEach((report) => { errors.push(...report.getErrors(options)); });
         }
      }

      // If `options.query` is defined then filter errors against the query object.
      if (typeof options.query === 'object')
      {
         errors = errors.filter((error) => ObjectUtil.safeEqual(options.query, error));
      }

      return errors;
   }

   /**
    * Returns the supported transform formats.
    *
    * @returns {Object[]}
    */
   static getFormats()
   {
      return TransformFormat.getFormats(ReportType.MODULE);
   }

   /**
    * Returns the name / id associated with this report.
    * @returns {string}
    */
   getName()
   {
      return typeof this.srcPath === 'string' ? this.srcPath : '';
   }

   /**
    * Returns the setting indexed by the given key.
    *
    * @param {string}   key - A key used to store the setting parameter.
    * @param {*}        defaultValue - A default value to return if no setting for the given key is currently stored.
    *
    * @returns {*}
    */
   getSetting(key, defaultValue = undefined)
   {
      /* istanbul ignore if */
      if (typeof key !== 'string' || key === '')
      {
         throw new TypeError(`getSetting error: 'key' is not a 'string' or is empty.`);
      }

      return typeof this.settings === 'object' && typeof this.settings[key] !== 'undefined' ? this.settings[key] :
       defaultValue;
   }

   /**
    * Deserializes a JSON object representing a ModuleReport.
    *
    * @param {object}   object - A JSON object of a ModuleReport that was previously serialized.
    *
    * @returns {ModuleReport}
    */
   static parse(object)
   {
      /* istanbul ignore if */
      if (typeof object !== 'object') { throw new TypeError(`parse error: 'object' is not an 'object'.`); }

      const report = Object.assign(new ModuleReport(), object);

      if (report.classes.length > 0)
      {
         report.classes = report.classes.map((classReport) => ClassReport.parse(classReport));
      }

      if (report.errors.length > 0)
      {
         report.errors = report.errors.map((error) => AnalyzeError.parse(error));
      }

      if (report.methods.length > 0)
      {
         report.methods = report.methods.map((methodReport) => ModuleMethodReport.parse(methodReport));
      }

      return report;
   }

   /**
    * Sets the setting indexed by the given key and returns true if successful.
    *
    * @param {string}   key - A key used to store the setting parameter.
    * @param {*}        value - A value to set to `this.settings[key]`.
    *
    * @returns {boolean}
    */
   setSetting(key, value)
   {
      /* istanbul ignore if */
      if (typeof key !== 'string' || key === '')
      {
         throw new TypeError(`setSetting error: 'key' is not a 'string' or is empty.`);
      }

      if (this.settings === 'object')
      {
         this.settings[key] = value;
         return true;
      }

      return false;
   }
}
