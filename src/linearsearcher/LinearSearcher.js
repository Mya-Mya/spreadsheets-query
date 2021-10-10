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
    const values = this._sheet
      .getRange(2, 1, this._sheet.getLastRow() - 1, this._sheet.getLastColumn())
      .getValues()
      .filter(predicate);
    return new SelectResult(headerValues, values);
  }
}
export default LinearSearcher;
