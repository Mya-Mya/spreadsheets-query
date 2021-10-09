import Querylang07 from "./querylang07/Querylang07";
/**
 *
 * @param {String} spreadsheetId
 * @param {String} sheetName
 * @param {String[]} selectingColumnNames
 * @returns {Querylang07}
 */
global.select = (spreadsheetId, sheetName, selectingColumnNames) =>
  new Querylang07(spreadsheetId, sheetName, selectingColumnNames);

import WhereClause from "./whereclause/WhereClause";
import And from "./whereclause/And";
import Or from "./whereclause/Or";
import Comparing from "./whereclause/Comparing";
import ComparingTypes from "./whereclause/ComparingTypes";

/**
 *
 * @param {WhereClause} whereClause
 * @returns {And}
 */
global.and = (whereClause) => new And(whereClause);
/**
 *
 * @param {WhereClause} whereClause
 * @returns {Or}
 */
global.or = (whereClause) => new Or(whereClause);
/**
 * @param {String} columnName
 * @param {ComparingType} comparingType
 * @param {any} value
 * @returns {Comparing}
 */
global.stringEquals = (columnName, value) =>
  new Comparing(columnName, ComparingTypes.STRING_EQUALS, value);
/**
 * @param {String} columnName
 * @param {ComparingType} comparingType
 * @param {any} value
 * @returns {Comparing}
 */
global.stringStartsWith = (columnName, value) =>
  new Comparing(columnName, ComparingTypes.STRING_STARTS_WITH, value);

/**
 * @param {String} columnName
 * @param {ComparingType} comparingType
 * @param {any} value
 * @returns {Comparing}
 */
global.stringEndsWith = (columnName, value) =>
  new Comparing(columnName, ComparingTypes.STRING_ENDS_WITH, value);

/**
 * @param {String} columnName
 * @param {ComparingType} comparingType
 * @param {any} value
 * @returns {Comparing}
 */
global.stringContains = (columnName, value) =>
  new Comparing(columnName, ComparingTypes.STRING_CONTAINS, value);

/**
 * @param {String} columnName
 * @param {ComparingType} comparingType
 * @param {any} value
 * @returns {Comparing}
 */
global.stringNotEquals = (columnName, value) =>
  new Comparing(columnName, ComparingTypes.STRING_NOT_EQUALS, value);

/**
 * @param {String} columnName
 * @param {ComparingType} comparingType
 * @param {any} value
 * @returns {Comparing}
 */
global.stringNotStartsWith = (columnName, value) =>
  new Comparing(columnName, ComparingTypes.STRING_NOT_STARTS_WITH, value);

/**
 * @param {String} columnName
 * @param {ComparingType} comparingType
 * @param {any} value
 * @returns {Comparing}
 */
global.stringNotEndsWith = (columnName, value) =>
  new Comparing(columnName, ComparingTypes.STRING_NOT_ENDS_WITH, value);

/**
 * @param {String} columnName
 * @param {ComparingType} comparingType
 * @param {any} value
 * @returns {Comparing}
 */
global.stringNotContains = (columnName, value) =>
  new Comparing(columnName, ComparingTypes.STRING_NOT_CONTAINS, value);

/**
 * @param {String} columnName
 * @param {ComparingType} comparingType
 * @param {any} value
 * @returns {Comparing}
 */
global.numberEquals = (columnName, value) =>
  new Comparing(columnName, ComparingTypes.NUMBER_EQUALS, value);

/**
 * @param {String} columnName
 * @param {ComparingType} comparingType
 * @param {any} value
 * @returns {Comparing}
 */
global.numberLagerThan = (columnName, value) =>
  new Comparing(columnName, ComparingTypes.NUMBER_LAGER_THAN, value);

/**
 * @param {String} columnName
 * @param {ComparingType} comparingType
 * @param {any} value
 * @returns {Comparing}
 */
global.numberLagerOrEquals = (columnName, value) =>
  new Comparing(columnName, ComparingTypes.NUMBER_LAGER_OR_EQUALS, value);

/**
 * @param {String} columnName
 * @param {ComparingType} comparingType
 * @param {any} value
 * @returns {Comparing}
 */
global.numberLessThan = (columnName, value) =>
  new Comparing(columnName, ComparingTypes.NUMBER_LESS_THAN, value);

/**
 * @param {String} columnName
 * @param {ComparingType} comparingType
 * @param {any} value
 * @returns {Comparing}
 */
global.numberLessOrEquals = (columnName, value) =>
  new Comparing(columnName, ComparingTypes.NUMBER_LESS_OR_EQUALS, value);

/**
 * @param {String} columnName
 * @param {ComparingType} comparingType
 * @param {any} value
 * @returns {Comparing}
 */
global.numberNotEquals = (columnName, value) =>
  new Comparing(columnName, ComparingTypes.NUMBER_NOT_EQUALS, value);

/**
 * @param {String} columnName
 * @param {ComparingType} comparingType
 * @param {any} value
 * @returns {Comparing}
 */
global.boolean = (columnName, value) =>
  new Comparing(columnName, ComparingTypes.BOOLEAN, value);
