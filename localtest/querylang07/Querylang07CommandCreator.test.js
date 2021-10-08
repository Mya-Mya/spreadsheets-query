import Querylang07CommandCreator from "../../src/querylang07/Querylang07CommandCreator";
import {
  createColumnProfilesFromNames,
  createColumnProfileFromBase0Index,
} from "../../src/columns";
import Comparing from "../../src/whereclause/Comparing";
import ComparingTypes from "../../src/whereclause/ComparingTypes";
import OrderbyTypes from "../../src/querylang07/OrderbyTypes";
const assert = require("assert");
describe("Querylang07CommandCreator", () => {
  it("Creates mapColumnNameToColumnId", () => {
    const creator = new Querylang07CommandCreator(
      "table",
      createColumnProfilesFromNames(["name", "age", "dept"]),
      ["dept", "age"]
    );
    console.log(creator._mapColumnNameToColumnId);
    console.log(creator._rangeSelector);
  });
  it("Detects the most left column and the most right column", () => {
    const creator = new Querylang07CommandCreator(
      "table",
      [
        createColumnProfileFromBase0Index(5, "end"),
        createColumnProfileFromBase0Index(3, "date"),
        createColumnProfileFromBase0Index(4, "start"),
      ],
      ["date"]
    );
    console.log(creator._rangeSelector);
  });
  it("Throws because of invalid strings on sheetName", () => {
    assert.throws(() => {
      new Querylang07CommandCreator("hoge'some dangerous command", [], []);
    });
  });
  it("Creates select clause text", () => {
    const creator = new Querylang07CommandCreator(
      "table",
      createColumnProfilesFromNames(["name", "age", "dept"]),
      ["dept", "age"]
    );
    console.log(creator._selectClauseText);
  });
  it.only("Creates command", () => {
    const command = new Querylang07CommandCreator(
      "table",
      createColumnProfilesFromNames(["name", "age", "dept"]),
      ["name", "age"]
    )
      .where(new Comparing("dept", ComparingTypes.STRING_CONTAINS, "et"))
      .orderby("name", OrderbyTypes.ASC)
      .limit(100)
      .offset(3)
      .create();
    console.log(command);
  });
});
