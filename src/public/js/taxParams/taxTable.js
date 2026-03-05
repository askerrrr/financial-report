import createTdElement from "../report/table/services/createTdElement.js";

var createTaxTable = async (taxParams) => {
  var tbody = document.getElementById("tax-tbody");

  for (var taxYear of taxParams) {
    var tr = document.createElement("tr");

    var { year, taxRate, paidInsuranceFee, mandatoryInsuranceFee, mandatoryInsuranceFeeRate } = taxYear;

    var yearTd = createTdElement(year, "year-" + year);
    var taxRateTd = createTdElement(taxRate, "taxRate-" + year);

    var insuranceFeeInfoElemId = "mandatoryInsuranceFee-" + year;
    var insuranceFeeInfoContent = `${paidInsuranceFee} / ${mandatoryInsuranceFee}`;
    var insuranceFeeInfoTdElem = createTdElement(insuranceFeeInfoContent, insuranceFeeInfoElemId);

    var mandatoryInsuranceFeeRateTd = createTdElement(mandatoryInsuranceFeeRate, "mandatoryInsuranceFeeRate-" + year);

    tr.append(yearTd, taxRateTd, insuranceFeeInfoTdElem, mandatoryInsuranceFeeRateTd);
    tbody.append(tr);
  }

  var table = document.getElementById("tax-table");

  table.append(tbody);
};

export default createTaxTable;