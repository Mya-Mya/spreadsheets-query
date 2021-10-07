import Proposition from "../../src/proposition/Proposition";
import Or from "../../src/proposition/Or";
import And from "../../src/proposition/And";
import Predicate from "../../src/proposition/Predicate";
import PredicateTypes from "../../src/proposition/PredicateTypes";

describe("Proposition", () => {
  const proposition = new And([
    new Or([
      new Predicate("age", PredicateTypes.NUMBER_LAGER_OR_EQUALS, 35),
      new Predicate("age", PredicateTypes.NUMBER_LESS_OR_EQUALS, 25),
    ]),
    new Predicate("dept", PredicateTypes.STRING_NOT_EQUALS, "Sales"),
  ]);
  console.log(JSON.stringify(proposition));
});
