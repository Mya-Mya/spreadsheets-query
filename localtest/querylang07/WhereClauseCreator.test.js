import And from "../../src/proposition/And";
import Or from "../../src/proposition/Or";
import Predicate from "../../src/proposition/Predicate";
import PredicateTypes from "../../src/proposition/PredicateTypes";
import WhereClauseCreator from "../../src/querylang07/WhereClauseCreator";
const assert = require("assert");

describe("WhereClauseCreator", () => {
  it("test 1", () => {
    const proposition = new And([
      new Or([
        new Predicate("age", PredicateTypes.NUMBER_LAGER_OR_EQUALS, 35),
        new Predicate("age", PredicateTypes.NUMBER_LESS_OR_EQUALS, 25),
      ]),
      new Predicate("dept", PredicateTypes.STRING_NOT_EQUALS, "Sales"),
    ]);
    const creator = new WhereClauseCreator({
      age: "F",
      dept: "B",
    });
    const whereClause = creator.getWhereClause(proposition);
    assert.equal(whereClause, "((F >= 35 OR F <= 25) AND B != 'Sales')");
  });
  it("test 2", () => {
    const proposition = new Or([
      new Or([
        new Predicate("age", PredicateTypes.NUMBER_LESS_OR_EQUALS, 30),
        new Predicate("name", PredicateTypes.STRING_NOT_STARTS_WITH, "Da"),
      ]),
      new And([
        new Predicate("dept", PredicateTypes.STRING_CONTAINS, "n"),
        new Predicate("isSenior", PredicateTypes.BOOLEAN, true),
      ]),
    ]);
    const creator = new WhereClauseCreator({
      age: "F",
      name: "A",
      dept: "B",
      isSenior: "G",
    });
    const whereClause = creator.getWhereClause(proposition);
    console.log(whereClause);
  });
  it("Removes injecting strings 1", () => {
    const proposition = new Predicate(
      "name",
      PredicateTypes.STRING_EQUALS,
      `David" OR 1 = 1 `
    );
    const creator = new WhereClauseCreator({ name: "A" });
    const whereClause = creator.getWhereClause(proposition);
    assert.equal(whereClause, "A = 'David OR 1 = 1 '");
  });
  it("Removes injecting strings 2", () => {
    const proposition = new Predicate(
      "name",
      PredicateTypes.STRING_EQUALS,
      "David ' OR `S` = true"
    );
    const creator = new WhereClauseCreator({ name: "A" });
    const whereClause = creator.getWhereClause(proposition);
    assert.equal(whereClause, "A = 'David  OR S = true'");
  });
});
