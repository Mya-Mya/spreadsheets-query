const STRING_COMPARING_CLAUSE_INJECTOR = /["'`]/g;
/**
 *
 * @param {String} text
 * @returns {String}
 */
export const removeStringComparingClauseInjector = (text) =>
  text.replace(STRING_COMPARING_CLAUSE_INJECTOR, "");

const INVALID_SHEETNAME_PATTERN = /["'`]/;

/**
 *
 * @param {String} text
 * @returns {Boolean}
 */
export const isValidSheetname = (text) => !INVALID_SHEETNAME_PATTERN.test(text);
