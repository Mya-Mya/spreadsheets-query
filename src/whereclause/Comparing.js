import WhereClause from "./WhereClause";
import WhereClauseTypes from "./WhereClauseTypes";
import { ComparingType } from "./ComparingTypes";

class Comparing extends WhereClause {
  /**
   * @param {String} columnName
   * @param {ComparingType} comparingType
   * @param {any} value
   */
  constructor(columnName, comparingType, value) {
    super();
    /**@protected @type {String} */
    this._columnName = columnName;
    /**@protected @type {ComparingType} */
    this._comparingType = comparingType;
    /**@protected @type {any} */
    this._value = value;
  }
  getType() {
    return WhereClauseTypes.COMPARING;
  }
  /**
   * @returns {ComparingType}
   */
  getComparingType() {
    return this._comparingType;
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
  getValue() {
    return this._value;
  }
}
export default Comparing;
