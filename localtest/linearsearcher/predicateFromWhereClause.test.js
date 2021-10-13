import predicateFromWhereClause from "../../src/linearsearcher/predicateFromWhereClause";
import And from "../../src/whereclause/And";
import Comparing from "../../src/whereclause/Comparing";
import ComparingTypes from "../../src/whereclause/ComparingTypes";

describe("predicateFromWhereClause", () => {
  const whereClause = new And([
    new Comparing("COLUMN_A", ComparingTypes.STRING_EQUALS, "a"),
    new Comparing("COLUMN_B", ComparingTypes.NUMBER_LESS_THAN, 3),
  ]);
  const recordArrays = [
    ["a", 1, "c"],
    ["d", 2, "f"],
    ["g", 3, "i"],
    ["a", 4, "l"],
    ["m", 5, "o"],
  ];
  recordArrays.forEach((recordArray) => {
    const result = predicateFromWhereClause(recordArray, whereClause, {
      COLUMN_A: 0,
      COLUMN_B: 1,
    });
    console.log(recordArray, result);
  });
});
