import WhereClause from "../../src/whereclause/WhereClause";
import Or from "../../src/whereclause/Or";
import And from "../../src/whereclause/And";
import Comparing from "../../src/whereclause/Comparing";
import ComparingTypes from "../../src/whereclause/ComparingTypes";

describe("WhereClause", () => {
  const whereClause = new And([
    new Or([
      new Comparing("age", ComparingTypes.NUMBER_LAGER_OR_EQUALS, 35),
      new Comparing("age", ComparingTypes.NUMBER_LESS_OR_EQUALS, 25),
    ]),
    new Comparing("dept", ComparingTypes.STRING_NOT_EQUALS, "Sales"),
  ]);
  console.log(JSON.stringify(whereClause));
});
