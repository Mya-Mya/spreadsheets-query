//@ts-check
/**
 * Query Language Reference (Version 0.7)
 * https://developers.google.com/chart/interactive/docs/querylanguage
 */
import WhereClause from "../whereclause/WhereClause";
import WhereClauseTypes from "../whereclause/WhereClauseTypes";
import And from "../whereclause/And";
import Or from "../whereclause/Or";
import Comparing from "../whereclause/Comparing";
import ComparingTypes from "../whereclause/ComparingTypes";

/**@type {RegExp} */
const INJECTING_STRING_PATTERN = /["'`]/g;

class WhereClauseCreator {
  /**
   * @param {Object<String,String>} mapColumnNameToColumnId
   */
  constructor(mapColumnNameToColumnId) {
    /**@private @type {Object<String,String>} */
    this._mapColumnNameToColumnId = mapColumnNameToColumnId;
  }
  /**
   *
   * @param {WhereClause} whereClause
   * @returns {String}
   */
  createWhereClauseText(whereClause) {
    const type = whereClause.getType();
    switch (type) {
      case WhereClauseTypes.AND:
        return this._getAndClause(/**@type {And}*/ (whereClause));
      case WhereClauseTypes.OR:
        return this._getOrClause(/**@type {Or} */ (whereClause));
      case WhereClauseTypes.COMPARING:
        return this._getComparingClause(/**@type {Comparing} */ (whereClause));
    }
    throw new Error(`Invalid Where Clause type : ${type}`);
  }
  /**
   * @param {And} andClause
   * @returns {String}
   */
  _getAndClause(andClause) {
    const clauses = andClause.getWhereClauses();
    const childClauses = clauses.map((clause) =>
      this.createWhereClauseText(clause)
    );
    return `(${childClauses.join(" AND ")})`;
  }
  /**
   *
   * @param {Or} orClause
   * @returns {String}
   */
  _getOrClause(orClause) {
    const clauses = orClause.getWhereClauses();
    const childClauses = clauses.map((clause) =>
      this.createWhereClauseText(clause)
    );
    return `(${childClauses.join(" OR ")})`;
  }
  /**
   *
   * @param {Comparing} comparing
   * @returns {String}
   */
  _getComparingClause(comparing) {
    const c = this._mapColumnNameToColumnId[comparing.getColumnName()];
    const f = comparing.getValue();
    switch (comparing.getComparingType()) {
      //String
      case ComparingTypes.STRING_EQUALS:
        return this._getStringComparingClause(c, f, "=");
      case ComparingTypes.STRING_STARTS_WITH:
        return this._getStringComparingClause(c, f, "STARTS WITH");
      case ComparingTypes.STRING_ENDS_WITH:
        return this._getStringComparingClause(c, f, "ENDS WITH");
      case ComparingTypes.STRING_CONTAINS:
        return this._getStringComparingClause(c, f, "CONTAINS");
      //StringNot
      case ComparingTypes.STRING_NOT_EQUALS:
        return this._getStringComparingClause(c, f, "!=");
      case ComparingTypes.STRING_NOT_STARTS_WITH:
        return this._not(this._getStringComparingClause(c, f, "STARTS WITH"));
      case ComparingTypes.STRING_NOT_ENDS_WITH:
        return this._not(this._getStringComparingClause(c, f, "ENDS WITH"));
      case ComparingTypes.STRING_NOT_CONTAINS:
        return this._not(this._getStringComparingClause(c, f, "CONTAINS"));
      //Number
      case ComparingTypes.NUMBER_EQUALS:
        return this._getNumberComparingClause(c, f, "=");
      case ComparingTypes.NUMBER_LAGER_THAN:
        return this._getNumberComparingClause(c, f, ">");
      case ComparingTypes.NUMBER_LAGER_OR_EQUALS:
        return this._getNumberComparingClause(c, f, ">=");
      case ComparingTypes.NUMBER_LESS_THAN:
        return this._getNumberComparingClause(c, f, "<");
      case ComparingTypes.NUMBER_LESS_OR_EQUALS:
        return this._getNumberComparingClause(c, f, "<=");
      //NumberNot
      case ComparingTypes.NUMBER_NOT_EQUALS:
        return this._getNumberComparingClause(c, f, "!=");
      //Boolean
      case ComparingTypes.BOOLEAN:
        return this._getBooleanComparingClause(c, f);
    }
  }

  /**
   *
   * @param {String} columnId
   * @param {any} fieldValue
   * @param {String} operator
   */
  _getStringComparingClause(columnId, fieldValue, operator) {
    const fieldValueString = this._removeInjectingString(fieldValue);
    return `${columnId} ${operator} '${fieldValueString}'`;
  }

  /**
   *
   * @param {String} clause
   * @returns {String}
   */
  _not(clause) {
    return `NOT ${clause}`;
  }

  /**
   *
   * @param {String} columnId
   * @param {any} fieldValue
   * @param {String} operator
   */
  _getNumberComparingClause(columnId, fieldValue, operator) {
    const fieldValueNumber = Number(fieldValue);
    return `${columnId} ${operator} ${fieldValueNumber.toString()}`;
  }

  _getBooleanComparingClause(columnId, fieldValue) {
    const fieldValueBoolean = Boolean(fieldValue);
    const fieldValueBooleanExpr = fieldValueBoolean ? "true" : "false";
    return `${columnId} = ${fieldValueBooleanExpr}`;
  }
  /**
   *
   * @param {String} text
   * @returns {String}
   */
  _removeInjectingString(text) {
    return text.replace(INJECTING_STRING_PATTERN, "");
  }
}

export default WhereClauseCreator;
