import _ from "underscore";
class SelectResult {
  /**
   *
   * @param {any[]} arrays
   * @returns {SelectResult}
   */
  static fromCombinedArrays(arrays) {
    const recordArrays = arrays.slice(1);
    const columnNames = arrays[0].map((x) => String(x));
    return new SelectResult(columnNames, recordArrays);
  }
  /**
   *
   * @param {String} columnNames
   * @param {any[][]} recordArrays
   */
  constructor(columnNames, recordArrays) {
    this._columnNames = columnNames;
    this._recordArrays = recordArrays;
  }

  /**
   * @returns {String[]}
   */
  columnNames() {
    return this._columnNames;
  }
  /**
   *
   * @returns {any[][]}
   */
  recordArrays() {
    return this._recordArrays;
  }
  /**
   *
   * @returns {any[][]}
   */
  arrays() {
    return this.recordArrays();
  }
  /**
   * @returns {Object[]}
   */
  recordObjects() {
    return this._recordArrays.map((array) =>
      _.object(this._columnNames, array)
    );
  }
  /**
   * @returns {Object[]}
   */
  objects() {
    return this.recordObjects();
  }
}
export default SelectResult;
