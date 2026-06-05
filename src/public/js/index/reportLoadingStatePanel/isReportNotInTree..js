var isReportNotInTree = (tableRowId) => {
  var tableRowIsNotExist = document.getElementById(tableRowId) === null;
  return tableRowIsNotExist;
};

export default isReportNotInTree;
