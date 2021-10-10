import SelectResult from "../src/SelectResult";

describe("SelectResult", () => {
  const result = SelectResult.fromCombinedArrays([
    ["name", "age", "dept"],
    ["John", 35, "Eng"],
    ["Dave", 27, "Eng"],
    ["Ben", 32, "Sales"],
  ]);
  console.log(result.columnNames());
  console.log(result.recordArrays());
  console.log(result.recordObjects());
});
