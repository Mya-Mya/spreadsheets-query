/**
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet
 */
export const getHeaderValues = (sheet) => {
  const lastColumn = sheet.getLastColumn();
  const range = sheet.getRange(1, 1, 1, lastColumn);
  const values = range.getValues()[0];
  return values;
};
