import _ from "underscore";
import { createColumnProfilesFromNames } from "../columns";
import SelectResult from "../SelectResult";
import { getHeaderValues } from "../spreadsheetUtils";
import WhereClause from "../whereclause/WhereClause";
import predicateFromWhereClause from "./predicateFromWhereClause";
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
   * @param {WhereClause} whereClause
   */
  selectWhere(whereClause) {
    const mapColumnNameToIndex = this._getMapColumnNameToIndex();
    return this.selectIf((recordArray) =>
      predicateFromWhereClause(recordArray, whereClause, mapColumnNameToIndex)
    );
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
  deleteWhere(whereClause) {
    const mapColumnNameToIndex = this._getMapColumnNameToIndex();
    return this.deleteIf((recordArray) =>
      predicateFromWhereClause(recordArray, whereClause, mapColumnNameToIndex)
    );
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
  /**
   *
   * @returns {Object<String,Number>}
   */
  _getMapColumnNameToIndex() {
    const headerValues = getHeaderValues(this._sheet);
    const columnProfiles = createColumnProfilesFromNames(headerValues);
    const mapColumnNameToIndex = _.object(
      _.pluck(columnProfiles, "name"),
      _.pluck(columnProfiles, "base0Index")
    );
    return mapColumnNameToIndex;
  }
}
export default LinearSearcher;
