//@ts-check
/**
 * Query Language Reference (Version 0.7)
 * https://developers.google.com/chart/interactive/docs/querylanguage
 */
import Proposition from "../proposition/Proposition";
import PropositionTypes from "../proposition/PropositionTypes";
import And from "../proposition/And";
import Or from "../proposition/Or";
import Predicate from "../proposition/Predicate";
import PredicateTypes from "../proposition/PredicateTypes";

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
   * @param {Proposition} proposition
   * @returns {String}
   */
  getWhereClause(proposition) {
    const type = proposition.getType();
    switch (type) {
      case PropositionTypes.AND:
        return this._getAndClause(/**@type {And}*/ (proposition));
      case PropositionTypes.OR:
        return this._getOrClause(/**@type {Or} */ (proposition));
      case PropositionTypes.PREDICATE:
        return this._getPredicateClause(/**@type {Predicate} */ (proposition));
    }
    throw new Error(`Invalid Proposition type : ${type}`);
  }
  /**
   * @param {And} andProposition
   * @returns {String}
   */
  _getAndClause(andProposition) {
    const propositions = andProposition.getPropositions();
    const childClauses = propositions.map((proposition) =>
      this.getWhereClause(proposition)
    );
    return `(${childClauses.join(" AND ")})`;
  }
  /**
   *
   * @param {Or} orProposition
   * @returns {String}
   */
  _getOrClause(orProposition) {
    const propositions = orProposition.getPropositions();
    const childClauses = propositions.map((proposition) =>
      this.getWhereClause(proposition)
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
