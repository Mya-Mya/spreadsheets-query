import LogicalOperator from "./LogicalOperator";
import Proposition from "./Proposition";
import PropositionTypes from "./PropositionTypes";
class Or extends LogicalOperator {
  /**
   *
   * @param {Proposition[]} propositions
   */
  constructor(propositions) {
    super(propositions);
  }
  getType() {
    return PropositionTypes.OR;
  }
}

export default Or;
