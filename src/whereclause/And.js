import LogicalOperator from "./LogicalOperator";
import WhereClause from "./WhereClause";
import WhereClauseTypes from "./WhereClauseTypes";
class And extends LogicalOperator {
  /**
   *
   * @param {WhereClause[]} clauses
   */
  constructor(clauses) {
    super(clauses);
  }
  getType() {
    return WhereClauseTypes.AND;
  }
}

export default And;
