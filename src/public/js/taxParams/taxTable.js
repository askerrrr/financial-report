import createTdElement from "../report/table/services/createTdElement.js";

var createTaxTable = async (taxParams) => {
  var tbody = document.getElementById("tax-tbody");

  for (var taxYear of taxParams) {
    var tr = document.createElement("tr");

    var {
      year,
      taxRate,
      finalProfit,
      retailAmount,
      paidTaxAmount,
      paidInsuranceFee,
      mandatoryInsuranceFee,
      additionalInsuranceFee,
      mandatoryInsuranceFeeRate,
    } = taxYear;

    var yearTd = createTdElement(year, "year-" + year);
    var taxRateTd = createTdElement(taxRate, "taxRate-" + year);

    var insuranceFeeInfoElemId = "mandatoryInsuranceFee-" + year;
    var insuranceFeeInfoContent = `${paidInsuranceFee} / ${mandatoryInsuranceFee}`;
    var insuranceFeeInfoTdElem = createTdElement(insuranceFeeInfoContent, insuranceFeeInfoElemId);

    var mandatoryInsuranceFeeRateTd = createTdElement(mandatoryInsuranceFeeRate, "mandatoryInsuranceFeeRate-" + year);

    var retailAmountTd = createTdElement(retailAmount);

    if (paidTaxAmount <= 0) {
      paidTaxAmount = 0;
    }

    var paidTaxAmountTd = createTdElement(paidTaxAmount);

    var additionalInsuranceFeeTd = createTdElement(additionalInsuranceFee);

    var finalProfitTd = createTdElement(finalProfit);

    tr.append(
      yearTd,
      taxRateTd,
      insuranceFeeInfoTdElem,
      mandatoryInsuranceFeeRateTd,
      retailAmountTd,
      paidTaxAmountTd,
      additionalInsuranceFeeTd,
      finalProfitTd,
    );
    tbody.append(tr);
  }

  var table = document.getElementById("tax-table");

  table.append(tbody);
};

export default createTaxTable;
