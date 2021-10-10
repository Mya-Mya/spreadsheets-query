import { createOrGetSheet } from "../spreadsheetUtils";
class QueryExecutor {
  /**
   *
   * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} spreadsheet
   * @param {String} workingSheetName
   * @param {String} targetSheetName
   * @param {String} mostLeftColumnId
   * @param {String} mostRightColumnId
   * @param {Number} bottomRowIndex
   * @param {boolean} deleteWorkingSheetOnFinished
   */
  constructor(
    spreadsheet,
    workingSheetName,
    targetSheetName,
    mostLeftColumnId,
    mostRightColumnId,
    bottomRowIndex,
    deleteWorkingSheetOnFinished
  ) {
    this._spreadsheet = spreadsheet;
    this._workingSheetName = workingSheetName;
    this._targetSheetName = targetSheetName;
    this._mostLeftColumnId = mostLeftColumnId;
    this._mostRightColumnId = mostRightColumnId;
    this._bottomRowIndex = Number(bottomRowIndex).toString();
    this._deleteWorkingSheetOnFinished = deleteWorkingSheetOnFinished;

    this._resultHeaderRow = [];
    this._resultContentRows = [];
    this._executed = false;
  }
  hasExecuted() {
    return this._executed;
  }
  /**
   *
   * @param {String} querylang07Command
   */
  execute(querylang07Command) {
    const command =
      `=QUERY(${this._targetSheetName}!` +
      `${this._mostLeftColumnId}1:${this._mostRightColumnId}${this._bottomRowIndex},` +
      `"${querylang07Command}")`;
    const sheet = createOrGetSheet(this._spreadsheet, this._workingSheetName);
    sheet.getRange(1, 1).setValue(command);
    const values = sheet
      .getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn())
      .getValues();

    this._resultContentRows = values.slice(1);
    this._resultHeaderRow = values[0];
    if (this._deleteWorkingSheetOnFinished)
      this._spreadsheet.deleteSheet(sheet);
    this._executed = true;
  }
  /**
   *
   * @returns {String[]}
   */
  getResultHeaderRow() {
    return this._resultHeaderRow;
  }
  /**
   *
   * @returns {any[][]}
   */
  getResultContentRows() {
    return this._resultContentRows;
  }
}
export default QueryExecutor;
