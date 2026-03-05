var sendNewTaxParam = async (year, recalculate = false, oldTaxParams, newTaxParam) => {
  var url = "/tax_params/change";

  var res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ year, recalculate, oldTaxParams, data: { ...newTaxParam } }),
  });

  return res.ok;
};

export default sendNewTaxParam;
