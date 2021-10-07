import LogicalOperator from "./LogicalOperator";
import WhereClause from "./WhereClause";
import WhereClauseTypes from "./WhereClauseTypes";
class Or extends LogicalOperator {
  /**
   *
   * @param {WhereClause[]} clauses
   */
  constructor(clauses) {
    super(clauses);
  }
  getType() {
    return WhereClauseTypes.OR;
  }
}

export default Or;
