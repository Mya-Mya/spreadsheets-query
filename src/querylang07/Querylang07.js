import WhereClause from "../whereclause/WhereClause";
import OrderbyTypes from "./OrderbyTypes";
import Querylang07CommandCreator from "./Querylang07CommandCreator";
import { createOrGetSheet, getHeaderValues } from "../spreadsheetUtils";
import { createColumnProfilesFromNames } from "../columns";
import _ from "underscore";
import QueryExecutor from "./QueryExecutor";
class Querylang07 {
  /**
   *
   * @param {String} spreadsheetId
   * @param {String} sheetName
   * @param {String[]} selectingColumnNames
   */
  constructor(spreadsheetId, sheetName, selectingColumnNames) {
    this._spreadsheet = SpreadsheetApp.openById(spreadsheetId);

    this._selectingColumnNames = selectingColumnNames;
    this._ran = false;
    this._resultArrays = undefined;
    this._resultObjects = undefined;

    this._targetSheetName = sheetName;
    this._targetSheet = this._spreadsheet.getSheetByName(sheetName);
    const headerValues = getHeaderValues(this._targetSheet);
    const columnProfiles = createColumnProfilesFromNames(headerValues);

    const sortedColumnProfiles = _.sortBy(columnProfiles, "base0Index");
    this._mostLeftColumnID = _.first(sortedColumnProfiles).id;
    this._mostRightColumnID = _.last(sortedColumnProfiles).id;
    /**
     * @type {Querylang07CommandCreator}
     */
    this._commandCreator = new Querylang07CommandCreator(
      sheetName,
      columnProfiles,
      selectingColumnNames
    );

    this._workingSheetName = `temp_spreadsheets-query_${Utilities.getUuid()}`;
    this._deleteWorkingSheetOnFinished = true;
  }
  /**
   *
   * @param {WhereClause} whereClause
   * @returns {Querylang07}
   */
  where(whereClause) {
    this._commandCreator.where(whereClause);
    return this;
  }
  /**
   *
   * @param {String} columnName
   * @param {OrderbyTypes} type
   * @returns {Querylang07}
   */
  orderby(columnName, type) {
    this._commandCreator.orderby(columnName, type);
    return this;
  }
  /**
   *
   * @param {String} columnName
   * @returns {Querylang07}
   */
  asc(columnName) {
    this.orderby(columnName, OrderbyTypes.ASC);
    return this;
  }
  /**
   *
   * @param {String} columnName
   * @returns {Querylang07}
   */
  desc(columnName) {
    this.orderby(columnName, OrderbyTypes.DESC);
    return this;
  }
  /**
   *
   * @param {Number} limit
   * @returns {Querylang07}
   */
  limit(limit) {
    this._commandCreator.limit(limit);
    return this;
  }
  /**
   * @param {Number} offset
   * @returns {Querylang07}
   */
  offset(offset) {
    this._commandCreator.offset(offset);
    return this;
  }
  hasRan() {
    return this._ran;
  }
  workingSheetName(workingSheetName) {
    this._workingSheetName = workingSheetName;
    this._deleteWorkingSheetOnFinished = false;
    return this;
  }
  run() {
    const querylang07Command = this._commandCreator.create();
    const executor = new QueryExecutor(
      this._spreadsheet,
      this._workingSheetName,
      this._targetSheetName,
      this._mostLeftColumnID,
      this._mostRightColumnID,
      this._targetSheet.getLastRow(),
      this._deleteWorkingSheetOnFinished
    );
    executor.execute(querylang07Command);
    this._resultArrays = executor.getResultContentRows();
    const resultHeaderRow = executor.getResultHeaderRow();
    this._resultObjects = this._resultArrays.map((resultArray) =>
      _.object(resultHeaderRow, resultArray)
    );
    this._ran = true;
    return;
  }
  objects() {
    if (!this._ran) this.run();
    return this._resultObjects;
  }
  arrays() {
    if (!this._ran) this.run();
    return this._resultArrays;
  }
}

export default Querylang07;
