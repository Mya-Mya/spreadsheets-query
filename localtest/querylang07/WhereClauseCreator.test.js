import And from "../../src/whereclause/And";
import Or from "../../src/whereclause/Or";
import Predicate from "../../src/whereclause/Predicate";
import PredicateTypes from "../../src/whereclause/PredicateTypes";
import WhereClauseCreator from "../../src/querylang07/WhereClauseCreator";
const assert = require("assert");

describe("WhereClauseCreator", () => {
  it("test 1", () => {
    const clause = new And([
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
    const text = creator.createWhereClauseText(clause);
    assert.equal(text, "((F >= 35 OR F <= 25) AND B != 'Sales')");
  });
  it("test 2", () => {
    const clause = new Or([
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
    const text = creator.createWhereClauseText(clause);
    console.log(text);
  });
  it("Removes injecting strings 1", () => {
    const clause = new Predicate(
      "name",
      PredicateTypes.STRING_EQUALS,
      `David" OR 1 = 1 `
    );
    const creator = new WhereClauseCreator({ name: "A" });
    const text = creator.createWhereClauseText(clause);
    assert.equal(text, "A = 'David OR 1 = 1 '");
  });
  it("Removes injecting strings 2", () => {
    const clause = new Predicate(
      "name",
      PredicateTypes.STRING_EQUALS,
      "David ' OR `S` = true"
    );
    const creator = new WhereClauseCreator({ name: "A" });
    const text = creator.createWhereClauseText(clause);
    assert.equal(text, "A = 'David  OR S = true'");
  });
});
