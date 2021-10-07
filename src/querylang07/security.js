const STRING_COMPARING_CLAUSE_INJECTOR = /["'`]/g;
/**
 *
 * @param {String} text
 * @returns {String}
 */
export const removeStringComparingClauseInjector = (text) =>
  text.replace(STRING_COMPARING_CLAUSE_INJECTOR, "");
