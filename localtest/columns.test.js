import _ from "underscore";
import {
  createColumnProfileFromBase0Index,
  createColumnProfilesFromNames,
} from "../src/columns";

describe("columns", () => {
  it("createColumnProfileFromBase0Index", () => {
    _.range(0, 30, 1).forEach((i) =>
      console.log(createColumnProfileFromBase0Index(i, i.toString()))
    );
  });
  it("createColumnProfilesFromNames", () => {
    console.log(
      createColumnProfilesFromNames([
        "",
        "",
        "name",
        "age",
        "birthday",
        "",
        "likes",
      ])
    );
  });
});
