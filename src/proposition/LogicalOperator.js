import Proposition from "./Proposition";

class LogicalOperator extends Proposition {
  /**
   *
   * @param {Proposition[]} propositions
   */
  constructor(propositions) {
    super();
    /**@protected @type {Proposition[]} */
    this._propositions = propositions;
  }
  /**
   *
   * @returns {Proposition[]}
   */
  getPropositions() {
    return this._propositions;
  }
}

export default LogicalOperator;
