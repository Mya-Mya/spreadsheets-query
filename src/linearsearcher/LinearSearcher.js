import SelectResult from "../SelectResult";
import { getHeaderValues } from "../spreadsheetUtils";
class LinearSearcher {
  /**
   *
   * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet
   */
  constructor(sheet) {
    this._sheet = sheet;
  }
  /**
   *
   * @param {function(any[]):boolean} predicate
   * @returns {SelectResult}
   */
  selectIf(predicate) {
    const headerValues = getHeaderValues(this._sheet);
    const values = this._getAllValuesFromSheet().filter(predicate);
    return new SelectResult(headerValues, values);
  }

  /**
   *
   * @param {function(any[]):boolean} predicate
   * @returns {Number}
   */
  deleteIf(predicate) {
    let indexes = [];
    this._getAllValuesFromSheet().forEach((value, index) => {
      if (predicate(value)) indexes.push(index + 2);
    });
    indexes
      .sort()
      .reverse()
      .forEach((index) => this._sheet.deleteRow(index));
    return indexes.length;
  }
  /**
   *
   * @returns {any[][]}
   */
  _getAllValuesFromSheet() {
    return this._sheet
      .getRange(2, 1, this._sheet.getLastRow() - 1, this._sheet.getLastColumn())
      .getValues();
  }
}
export default LinearSearcher;
