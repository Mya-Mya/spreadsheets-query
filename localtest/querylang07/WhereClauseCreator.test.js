import And from "../../src/whereclause/And";
import Or from "../../src/whereclause/Or";
import Comparing from "../../src/whereclause/Comparing";
import ComparingTypes from "../../src/whereclause/ComparingTypes";
import WhereClauseCreator from "../../src/querylang07/WhereClauseCreator";
const assert = require("assert");

describe("WhereClauseCreator", () => {
  it("test 1", () => {
    const clause = new And([
      new Or([
        new Comparing("age", ComparingTypes.NUMBER_LAGER_OR_EQUALS, 35),
        new Comparing("age", ComparingTypes.NUMBER_LESS_OR_EQUALS, 25),
      ]),
      new Comparing("dept", ComparingTypes.STRING_NOT_EQUALS, "Sales"),
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
        new Comparing("age", ComparingTypes.NUMBER_LESS_OR_EQUALS, 30),
        new Comparing("name", ComparingTypes.STRING_NOT_STARTS_WITH, "Da"),
      ]),
      new And([
        new Comparing("dept", ComparingTypes.STRING_CONTAINS, "n"),
        new Comparing("isSenior", ComparingTypes.BOOLEAN, true),
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
    const clause = new Comparing(
      "name",
      ComparingTypes.STRING_EQUALS,
      `David" OR 1 = 1 `
    );
    const creator = new WhereClauseCreator({ name: "A" });
    const text = creator.createWhereClauseText(clause);
    assert.equal(text, "A = 'David OR 1 = 1 '");
  });
  it("Removes injecting strings 2", () => {
    const clause = new Comparing(
      "name",
      ComparingTypes.STRING_EQUALS,
      "David ' OR `S` = true"
    );
    const creator = new WhereClauseCreator({ name: "A" });
    const text = creator.createWhereClauseText(clause);
    assert.equal(text, "A = 'David  OR S = true'");
  });
});
