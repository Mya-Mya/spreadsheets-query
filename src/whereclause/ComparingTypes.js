/**
 * @typedef {String} ComparingType
 */

/**
 * @readonly
 * @enum {ComparingType} */
const ComparingTypes = {
  //String
  STRING_EQUALS: "StringEquals",
  STRING_STARTS_WITH: "StringStartsWith",
  STRING_ENDS_WITH: "StringEndsWith",
  STRING_CONTAINS: "StringContains",
  //StringNot
  STRING_NOT_EQUALS: "StringNotEquals",
  STRING_NOT_STARTS_WITH: "StringNotStartsWith",
  STRING_NOT_ENDS_WITH: "StringNotEndsWith",
  STRING_NOT_CONTAINS: "StringNotContains",
  //Number
  NUMBER_EQUALS: "NumberEquals",
  NUMBER_LAGER_THAN: "NumberLagerThan",
  NUMBER_LAGER_OR_EQUALS: "NumberLagerOrEquals",
  NUMBER_LESS_THAN: "NumberLessThan",
  NUMBER_LESS_OR_EQUALS: "NumberLessOrEquals",
  //NumberNot
  NUMBER_NOT_EQUALS: "NumberNotEquals",
  //Boolean
  BOOLEAN: "Boolean",
};
export default ComparingTypes;
