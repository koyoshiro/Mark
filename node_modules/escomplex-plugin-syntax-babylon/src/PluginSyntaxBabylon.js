import PluginSyntaxESTree  from 'escomplex-plugin-syntax-estree/src/PluginSyntaxESTree';

import ASTParser           from 'typhonjs-escomplex-commons/src/utils/ast/ASTParser';
import TraitUtil           from 'typhonjs-escomplex-commons/src/module/traits/TraitUtil';

import actualize           from 'typhonjs-escomplex-commons/src/module/traits/actualize';

/**
 * Provides an typhonjs-escomplex-module / ESComplexModule plugin which loads syntax definitions for trait resolution
 * for unique Babylon AST not found in ESTree.
 *
 * @see https://www.npmjs.com/package/typhonjs-escomplex-module
 */
export default class PluginSyntaxBabylon extends PluginSyntaxESTree
{
   // Unique Babylon AST nodes --------------------------------------------------------------------------------------

   /**
    * @see https://github.com/babel/babylon/blob/master/ast/spec.md#bindexpression
    * @returns {{lloc: *, cyclomatic: *, operators: *, operands: *, ignoreKeys: *, newScope: *, dependencies: *}}
    */
   BindExpression() { return actualize(0, 0); }

   /**
    * @see https://github.com/babel/babylon/blob/master/ast/spec.md#booleanliteral
    * @returns {{lloc: *, cyclomatic: *, operators: *, operands: *, ignoreKeys: *, newScope: *, dependencies: *}}
    */
   BooleanLiteral() { return actualize(0, 0, undefined, (node) => { return node.value; }); }

   /**
    * @see https://github.com/babel/babylon/blob/master/ast/spec.md#classmethod
    * @returns {{lloc: *, cyclomatic: *, operators: *, operands: *, ignoreKeys: *, newScope: *, dependencies: *}}
    */
   ClassMethod()
   {
      return actualize(0, 0, (node) =>
      {
         const operators = typeof node.computed === 'boolean' && node.computed ?
          [...ASTParser.parse(node.key).operators] : [];

         operators.push(typeof node.generator === 'boolean' && node.generator ? 'function*' : 'function');

         if (node.kind && (node.kind === 'get' || node.kind === 'set')) { operators.push(node.kind); }
         if (typeof node.async === 'boolean' && node.async) { operators.push('async'); }
         if (typeof node.static === 'boolean' && node.static) { operators.push('static'); }
         return operators;
      },
      (node, parent) => { return s_SAFE_COMPUTED_OPERANDS(node, parent); },
      'key',   // Note: must skip key as the assigned name is determined above.
      (node) =>
      {
         let name;

         if (typeof node.computed === 'boolean' && node.computed)
         {
            name = node.key.type === 'StringLiteral' ? TraitUtil.safeValue(node.key) :
             `<computed~${ASTParser.parse(node.key).source}>`;
         }
         else // ClassMethod is not computed and is an `Identifier` node.
         {
            name = TraitUtil.safeName(node.key);
         }

         return {
            type: 'method',
            name,
            lineStart: node.loc.start.line,
            lineEnd: node.loc.end.line,
            paramCount: node.params.length
         };
      });
   }

   /**
    * @see https://github.com/babel/babylon/blob/master/ast/spec.md#decorator
    * @returns {{lloc: *, cyclomatic: *, operators: *, operands: *, ignoreKeys: *, newScope: *, dependencies: *}}
    */
   Decorator() { return actualize(0, 0); }

   /**
    * @see https://github.com/babel/babylon/blob/master/ast/spec.md#directive
    * @returns {{lloc: *, cyclomatic: *, operators: *, operands: *, ignoreKeys: *, newScope: *, dependencies: *}}
    */
   Directive() { return actualize(1, 0); }

   /**
    * Avoid conflicts between string literals and identifiers.
    *
    * @see https://github.com/babel/babylon/blob/master/ast/spec.md#directiveliteral
    * @returns {{lloc: *, cyclomatic: *, operators: *, operands: *, ignoreKeys: *, newScope: *, dependencies: *}}
    */
   DirectiveLiteral()
   {
      return actualize(0, 0, void 0, (node) =>
      {
         return typeof node.value === 'string' ? `"${node.value}"` : node.value;
      });
   }

   /**
    * @see https://github.com/babel/babylon/blob/master/ast/spec.md#nullliteral
    * @returns {{lloc: *, cyclomatic: *, operators: *, operands: *, ignoreKeys: *, newScope: *, dependencies: *}}
    */
   NullLiteral() { return actualize(0, 0, void 0, 'null'); }

   /**
    * @see https://github.com/babel/babylon/blob/master/ast/spec.md#numericliteral
    * @returns {{lloc: *, cyclomatic: *, operators: *, operands: *, ignoreKeys: *, newScope: *, dependencies: *}}
    */
   NumericLiteral() { return actualize(0, 0, void 0, (node) => { return node.value; }); }

   /**
    * @see https://github.com/babel/babylon/blob/master/ast/spec.md#objectmethod
    * @returns {{lloc: *, cyclomatic: *, operators: *, operands: *, ignoreKeys: *, newScope: *, dependencies: *}}
    */
   ObjectMethod()
   {
      return actualize(0, 0, (node) =>
      {
         return typeof node.kind === 'string' && (node.kind === 'get' || node.kind === 'set') ? node.kind : void 0;
      },
      void 0,
      'key');  // Note: must skip key as the assigned name is forwarded on to FunctionExpression.
   }

   /**
    * Note: that w/ ES6+ `:` may be omitted and the Property node defines `shorthand` to indicate this case.
    *
    * @see https://github.com/babel/babylon/blob/master/ast/spec.md#objectproperty
    * @returns {{lloc: *, cyclomatic: *, operators: *, operands: *, ignoreKeys: *, newScope: *, dependencies: *}}
    */
   ObjectProperty()
   {
      return actualize(1, 0, (node) =>
      {
         return typeof node.shorthand === 'undefined' ? ':' :
          typeof node.shorthand === 'boolean' && !node.shorthand ? ':' : void 0;
      });
   }

   /**
    * @see https://github.com/babel/babylon/blob/master/ast/spec.md#regexpliteral
    * @returns {{lloc: *, cyclomatic: *, operators: *, operands: *, ignoreKeys: *, newScope: *, dependencies: *}}
    */
   RegExpLiteral()
   {
      return actualize(0, 0, void 0, (node) =>
      {
         const operands = [];

         if (typeof node.extra === 'object' && typeof node.extra.raw !== 'undefined')
         {
            operands.push(node.extra.raw);
         }

         return operands;
      });
   }

   /**
    * @see https://github.com/babel/babylon/blob/master/ast/spec.md#restproperty
    * @returns {{lloc: *, cyclomatic: *, operators: *, operands: *, ignoreKeys: *, newScope: *, dependencies: *}}
    */
   RestProperty() { return actualize(0, 0, '... (rest)'); }

   /**
    * @see https://github.com/babel/babylon/blob/master/ast/spec.md#spreadproperty
    * @returns {{lloc: *, cyclomatic: *, operators: *, operands: *, ignoreKeys: *, newScope: *, dependencies: *}}
    */
   SpreadProperty() { return actualize(0, 0, '... (spread)'); }

   /**
    * Avoid conflicts between string literals and identifiers.
    *
    * @see https://github.com/babel/babylon/blob/master/ast/spec.md#stringliteral
    * @returns {{lloc: *, cyclomatic: *, operators: *, operands: *, ignoreKeys: *, newScope: *, dependencies: *}}
    */
   StringLiteral() { return actualize(0, 0, void 0, (node) => { return `"${node.value}"`; }); }
}

/**
 * Provides a utility method that determines the operands of a method for Babylon AST nodes. If the name is a computed
 * value and not a string literal then `ASTGenerator` is invoked to determine the computed operands.
 *
 * @param {object}   node - The current AST node.
 *
 * @returns {Array<*>}
 */
function s_SAFE_COMPUTED_OPERANDS(node)
{
   const operands = [];

   if (typeof node.computed === 'boolean' && node.computed)
   {
      // The following will pick up a single literal computed value (string).
      if (node.key.type === 'StringLiteral')
      {
         operands.push(TraitUtil.safeValue(node.key));
      }
      else // Fully evaluate AST node and children for computed operands.
      {
         operands.push(...ASTParser.parse(node.key).operands);
      }
   }
   else // Parent is not computed and `parent.key` is an `Identifier` node.
   {
      operands.push(TraitUtil.safeName(node.key));
   }

   return operands;
}
