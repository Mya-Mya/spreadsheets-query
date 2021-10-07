import WhereClause from "./WhereClause";
import WhereClauseTypes from "./WhereClauseTypes";
import { PredicateType } from "./PredicateTypes";

class Predicate extends WhereClause {
  /**
   * @param {String} columnName
   * @param {PredicateType} predicateType
   * @param {any} fieldValue
   */
  constructor(columnName, predicateType, fieldValue) {
    super();
    /**@protected @type {String} */
    this._columnName = columnName;
    /**@protected @type {PredicateType} */
    this._predicateType = predicateType;
    /**@protected @type {any} */
    this._fieldValue = fieldValue;
  }
  getType() {
    return WhereClauseTypes.PREDICATE;
  }
  /**
   * @returns {PredicateType}
   */
  getPredicateType() {
    return this._predicateType;
  }
  /**
   * @return {String}
   */
  getColumnName() {
    return this._columnName;
  }
  /**
   * @return {any}
   */
  getFieldValue() {
    return this._fieldValue;
  }
}
export default Predicate;
