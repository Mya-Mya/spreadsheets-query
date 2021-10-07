import WhereClause from "./WhereClause";

class LogicalOperator extends WhereClause {
  /**
   *
   * @param {WhereClause[]} clauses
   */
  constructor(clauses) {
    super();
    /**@protected @type {WhereClause[]} */
    this._clauses = clauses;
  }
  /**
   *
   * @returns {WhereClause[]}
   */
  getWhereClauses() {
    return this._clauses;
  }
}

export default LogicalOperator;
