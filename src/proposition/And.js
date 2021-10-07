import LogicalOperator from "./LogicalOperator";
import Proposition from "./Proposition";
import PropositionTypes from "./PropositionTypes";
class And extends LogicalOperator {
  /**
   *
   * @param {Proposition[]} propositions
   */
  constructor(propositions) {
    super(propositions);
  }
  getType() {
    return PropositionTypes.AND;
  }
}

export default And;
