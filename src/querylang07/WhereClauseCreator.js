//@ts-check
/**
 * Query Language Reference (Version 0.7)
 * https://developers.google.com/chart/interactive/docs/querylanguage
 */
import WhereClause from "../whereclause/WhereClause";
import WhereClauseTypes from "../whereclause/WhereClauseTypes";
import And from "../whereclause/And";
import Or from "../whereclause/Or";
import Predicate from "../whereclause/Predicate";
import PredicateTypes from "../whereclause/PredicateTypes";

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
      case WhereClauseTypes.PREDICATE:
        return this._getPredicateClause(/**@type {Predicate} */ (whereClause));
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
   * @param {Predicate} predicate
   * @returns {String}
   */
  _getPredicateClause(predicate) {
    const c = this._mapColumnNameToColumnId[predicate.getColumnName()];
    const f = predicate.getFieldValue();
    switch (predicate.getPredicateType()) {
      //String
      case PredicateTypes.STRING_EQUALS:
        return this._getStringPredicateClause(c, f, "=");
      case PredicateTypes.STRING_STARTS_WITH:
        return this._getStringPredicateClause(c, f, "STARTS WITH");
      case PredicateTypes.STRING_ENDS_WITH:
        return this._getStringPredicateClause(c, f, "ENDS WITH");
      case PredicateTypes.STRING_CONTAINS:
        return this._getStringPredicateClause(c, f, "CONTAINS");
      //StringNot
      case PredicateTypes.STRING_NOT_EQUALS:
        return this._getStringPredicateClause(c, f, "!=");
      case PredicateTypes.STRING_NOT_STARTS_WITH:
        return this._notPredicateClause(
          this._getStringPredicateClause(c, f, "STARTS WITH")
        );
      case PredicateTypes.STRING_NOT_ENDS_WITH:
        return this._notPredicateClause(
          this._getStringPredicateClause(c, f, "ENDS WITH")
        );
      case PredicateTypes.STRING_NOT_CONTAINS:
        return this._notPredicateClause(
          this._getStringPredicateClause(c, f, "CONTAINS")
        );
      //Number
      case PredicateTypes.NUMBER_EQUALS:
        return this._getNumberPredicateClause(c, f, "=");
      case PredicateTypes.NUMBER_LAGER_THAN:
        return this._getNumberPredicateClause(c, f, ">");
      case PredicateTypes.NUMBER_LAGER_OR_EQUALS:
        return this._getNumberPredicateClause(c, f, ">=");
      case PredicateTypes.NUMBER_LESS_THAN:
        return this._getNumberPredicateClause(c, f, "<");
      case PredicateTypes.NUMBER_LESS_OR_EQUALS:
        return this._getNumberPredicateClause(c, f, "<=");
      //NumberNot
      case PredicateTypes.NUMBER_NOT_EQUALS:
        return this._getNumberPredicateClause(c, f, "!=");
      //Boolean
      case PredicateTypes.BOOLEAN:
        return this._getBooleanPredicateClause(c, f);
    }
  }

  /**
   *
   * @param {String} columnId
   * @param {any} fieldValue
   * @param {String} operator
   */
  _getStringPredicateClause(columnId, fieldValue, operator) {
    const fieldValueString = this._removeInjectingString(fieldValue);
    return `${columnId} ${operator} '${fieldValueString}'`;
  }

  /**
   *
   * @param {String} clause
   * @returns {String}
   */
  _notPredicateClause(clause) {
    return `NOT ${clause}`;
  }

  /**
   *
   * @param {String} columnId
   * @param {any} fieldValue
   * @param {String} operator
   */
  _getNumberPredicateClause(columnId, fieldValue, operator) {
    const fieldValueNumber = Number(fieldValue);
    return `${columnId} ${operator} ${fieldValueNumber.toString()}`;
  }

  _getBooleanPredicateClause(columnId, fieldValue) {
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
