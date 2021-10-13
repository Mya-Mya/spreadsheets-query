//@ts-check
import And from "../whereclause/And";
import Or from "../whereclause/Or";
import Comparing from "../whereclause/Comparing";
import WhereClause from "../whereclause/WhereClause";
import WhereClauseTypes from "../whereclause/WhereClauseTypes";
import ComparingTypes, { ComparingType } from "../whereclause/ComparingTypes";

/**
 * @param {any[]} recordArray
 * @param {WhereClause} clause
 * @param {Object<String,Number>} mapColumnNameToIndex
 * @returns {boolean}
 */
const predicateFromWhereClause = (
  recordArray,
  clause,
  mapColumnNameToIndex
) => {
  const type = clause.getType();
  switch (type) {
    case WhereClauseTypes.AND:
      return /**@type {And} */ (clause)
        .getWhereClauses()
        .every((c) =>
          predicateFromWhereClause(recordArray, c, mapColumnNameToIndex)
        );
    case WhereClauseTypes.OR:
      return !(
        /**@type {Or} */ (clause)
          .getWhereClauses()
          .every(
            (c) =>
              !predicateFromWhereClause(recordArray, c, mapColumnNameToIndex)
          )
      );
    case WhereClauseTypes.COMPARING:
      return predicateFromComparingWhereClause(
        recordArray,
        /**@type {Comparing} */ (clause),
        mapColumnNameToIndex
      );
    default:
      throw new Error(`Invalid Clause type : ${type}`);
  }
};
/**
 *
 * @param {any[]} recordArray
 * @param {Comparing} comparingClause
 * @param {Object<String,Number>} mapColumnNameToIndex
 * @returns {boolean}
 */
const predicateFromComparingWhereClause = (
  recordArray,
  comparingClause,
  mapColumnNameToIndex
) => {
  const type = comparingClause.getComparingType();
  const index = mapColumnNameToIndex[comparingClause.getColumnName()];
  const f = recordArray[index];
  const v = comparingClause.getValue();
  switch (type) {
    //String
    case ComparingTypes.STRING_EQUALS:
      return f === v;
    case ComparingTypes.STRING_STARTS_WITH:
      return f.startsWith(v);
    case ComparingTypes.STRING_ENDS_WITH:
      return f.endsWith(v);
    case ComparingTypes.STRING_CONTAINS:
      return f.includes(v);
    //StringNot

    case ComparingTypes.STRING_NOT_EQUALS:
      return f !== v;
    case ComparingTypes.STRING_NOT_STARTS_WITH:
      return !f.startsWith(v);
    case ComparingTypes.STRING_NOT_ENDS_WITH:
      return !f.endsWith(v);
    case ComparingTypes.STRING_NOT_CONTAINS:
      return !f.includes(v);
    //Number
    case ComparingTypes.NUMBER_EQUALS:
      return f === v;
    case ComparingTypes.NUMBER_LAGER_THAN:
      return f > v;
    case ComparingTypes.NUMBER_LAGER_OR_EQUALS:
      return f >= v;
    case ComparingTypes.NUMBER_LESS_THAN:
      return f < v;
    case ComparingTypes.NUMBER_LESS_OR_EQUALS:
      return f <= v;
    //NumberNot
    case ComparingTypes.NUMBER_NOT_EQUALS:
      return f !== v;
    //Boolean
    case ComparingTypes.BOOLEAN:
      return f === v;
  }
};

export default predicateFromWhereClause;
