import WhereClause from "../whereclause/WhereClause";
import { ColumnProfile } from "../columns";
import OrderbyTypes, { OrderbyType } from "./OrderbyTypes";
import _ from "underscore";
import WhereClauseCreator from "./WhereClauseCreator";
import { isValidSheetname } from "./security";
class Querylang07CommandCreator {
  /**
   * @param {String} sheetName
   * @param {ColumnProfile[]} columnProfiles
   * @param {String[]} selectingColumnNames
   */
  constructor(sheetName, columnProfiles, selectingColumnNames) {
    if (!isValidSheetname(sheetName))
      throw new Error(`Invalid strings in sheetName : ${sheetName}`);

    /**@type {Object<String,String>} */
    this._mapColumnNameToColumnId = _.object(
      _.pluck(columnProfiles, "name"),
      _.pluck(columnProfiles, "id")
    );

    this._selectClauseText = selectingColumnNames
      .map((name) => this._mapColumnNameToColumnId[name])
      .join(",");

    const sortedColumnProfiles = _.sortBy(columnProfiles, "base0Index");
    const mostLeftColumnID = _.first(sortedColumnProfiles).id;
    const mostRightColumnID = _.last(sortedColumnProfiles).id;
    /**
     * @type {String}
     */
    this._rangeSelector = `'${sheetName}'!${mostLeftColumnID}:${mostRightColumnID}`;

    this._whereClauseText = undefined;
    this._orderbyClauseTexts = [];
    this._limitParam = undefined;
    this._offsetParam = undefined;
  }
  /**
   *
   * @param {WhereClause} whereClause
   * @returns {Querylang07CommandCreator}
   */
  where(whereClause) {
    const creator = new WhereClauseCreator(this._mapColumnNameToColumnId);
    this._whereClauseText = creator.createWhereClauseText(whereClause);
    return this;
  }
  /**
   *
   * @param {String} columnName
   * @param {OrderbyType} type
   * @returns {Querylang07CommandCreator}
   */
  orderby(columnName, type) {
    let typeText;
    switch (type) {
      case OrderbyTypes.ASC:
        typeText = "ASC";
        break;
      case OrderbyTypes.DESC:
        typeText = "DESC";
        break;
      default:
        throw new Error(`Invalid Orderby type : ${type}`);
    }
    const columnId = this._mapColumnNameToColumnId[columnName];
    this._orderbyClauseTexts.push(`${columnId} ${typeText}`);
    return this;
  }
  /**
   *
   * @param {Number} limit
   * @returns {Querylang07CommandCreator}
   */
  limit(limit) {
    this._limitParam = Number(limit);
    return this;
  }
  /**
   *
   * @param {Number} offset
   * @returns {Querylang07CommandCreator}
   */
  offset(offset) {
    this._offsetParam = Number(offset);
    return this;
  }
  create() {
    return (
      `SELECT ${this._selectClauseText} ` +
      (this._whereClauseText == undefined
        ? ""
        : `WHERE ${this._whereClauseText} `) +
      (this._orderbyClauseTexts.length == 0
        ? ""
        : this._orderbyClauseTexts
            .map((text) => `ORDER BY ${text} `)
            .join("")) +
      (this._limitParam == undefined
        ? ""
        : `LIMIT ${this._limitParam.toString()} `) +
      (this._offsetParam == undefined
        ? ""
        : `OFFSET ${this._offsetParam.toString()}`)
    );
  }
}

export default Querylang07CommandCreator;
