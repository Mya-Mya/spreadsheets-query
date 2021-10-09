//@ts-check
/**
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet
 * @returns {any[]}
 */
export const getHeaderValues = (sheet) => {
  const lastColumn = sheet.getLastColumn();
  const range = sheet.getRange(1, 1, 1, lastColumn);
  const values = range.getValues()[0];
  return values;
};

/**
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} spreadsheet
 * @param {String} sheetName
 * @returns {GoogleAppsScript.Spreadsheet.Sheet}
 */
export const createOrGetSheet = (spreadsheet, sheetName) => {
  const sheets = spreadsheet.getSheets();
  if (sheets.findIndex((i) => i.getSheetName() === sheetName) == -1) {
    spreadsheet.insertSheet(sheetName);
  }
  const sheet = spreadsheet.getSheetByName(sheetName);
  return sheet;
};
