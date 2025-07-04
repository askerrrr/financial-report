import createMonthsDetails from "./createMonthsDetails.js";

var createYearsDetails = async (years) => {
  var yearsContainer = document.getElementById("years_container");

  for (var { year, months } of years) {
    var summary = document.createElement("summary");
    summary.append(year);

    var monthsDetails = await createMonthsDetails(months, year);

    var yearDetails = document.createElement("details");
    yearDetails.id = year;

    yearDetails.append(summary, monthsDetails);

    yearsContainer.append(yearDetails);
  }
};

export default createYearsDetails;
