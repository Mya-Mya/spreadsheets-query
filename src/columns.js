import _ from "underscore";
/**
 * @typedef ColumnProfile
 * @property {Number} base1Index
 * @property {Number} base0Index
 * @property {String} name
 * @property {String} id
 */

export const map26RadixToA1NotationChar = _.object(
  Array.from("0123456789abcdefghijklmnop"),
  Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
);
/**
 *
 * @param {Number} base0Index
 * @param {String} name
 * @returns {ColumnProfile}
 */
export const createColumnProfileFromBase0Index = (base0Index, name) => {
  const string26Radix = (base0Index + 650).toString(26).toLowerCase();
  const id = Array.from(string26Radix.substring(1))
    .map((x) => map26RadixToA1NotationChar[x])
    .join("");
  return {
    base0Index,
    base1Index: base0Index + 1,
    name,
    id,
  };
};

/**
 *
 * @param {String[]} names
 * @returns {ColumnProfile[]}
 */
export const createColumnProfilesFromNames = (names) =>
  names.map((name, base0Index) =>
    createColumnProfileFromBase0Index(base0Index, name)
  );
