import WhereClause from "../whereclause/WhereClause";
import OrderbyTypes from "./OrderbyTypes";
import Querylang07CommandCreator from "./Querylang07CommandCreator";
import { createOrGetSheet, getHeaderValues } from "../spreadsheetUtils";
import { createColumnProfilesFromNames } from "../columns";
import _ from "underscore";
class Querylang07 {
  /**
   *
   * @param {String} spreadsheetId
   * @param {String} sheetName
   * @param {String[]} selectingColumnNames
   */
  constructor(spreadsheetId, sheetName, selectingColumnNames) {
    const ss = SpreadsheetApp.openById(spreadsheetId);

    this._workingSheet = createOrGetSheet(ss, "__spreadsheets-query_uses");
    this._selectingColumnNames = selectingColumnNames;
    this._ran = false;
    this._resultArrays = undefined;
    this._resultObjects = undefined;

    const targetSheet = ss.getSheetByName(sheetName);
    const headerValues = getHeaderValues(targetSheet);
    const columnProfiles = createColumnProfilesFromNames(headerValues);

    /**
     * @type {Querylang07CommandCreator}
     */
    this._commandCreator = new Querylang07CommandCreator(
      sheetName,
      columnProfiles,
      selectingColumnNames
    );
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
  run() {
    const command = this._commandCreator.create();
    this._workingSheet.getRange(1, 1).setValue(command);
    const values = this._workingSheet
      .getRange(
        1,
        1,
        this._workingSheet.getLastRow(),
        this._workingSheet.getLastColumn()
      )
      .getValues();
    this._resultArrays = values.splice(1);
    this._resultObjects = this._resultArrays.map((resultArray) =>
      _.object(this._selectingColumnNames, resultArray)
    );
    this._ran = true;
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
