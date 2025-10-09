import createTdElement from "../report/table/services/createTdElement.js";

var createTaxTable = async (taxParams) => {
  var tbody = document.getElementById("tax-tbody");

  for (var taxYear of taxParams) {
    var tr = document.createElement("tr");

    var { year, taxRate, paidInsuranceFee, mandatoryInsuranceFee, insuranceFeePercentage } = taxYear;

    var yearTd = createTdElement(year, "year-" + year);
    var taxRateTd = createTdElement(taxRate, "taxRate-" + year);
    var mandatoryInsuranceFeeTd = createTdElement(mandatoryInsuranceFee, "mandatoryInsuranceFee-" + year);

    var insuranceFeePercentageTd = createTdElement(insuranceFeePercentage, "insuranceFeePercentage-" + year);

    var paidInsuranceFeeTd = createTdElement(paidInsuranceFee, "paidInsuranceFee-" + year);

    tr.append(yearTd, taxRateTd, mandatoryInsuranceFeeTd, paidInsuranceFeeTd, insuranceFeePercentageTd);
    tbody.append(tr);
  }

  var table = document.getElementById("tax-table");

  table.append(tbody);
};

export default createTaxTable;
