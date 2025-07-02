import createMonthsDetails from "./createMonthsDetails.js";

var createYearsDetails = async (years) => {
  for (var { year, months } of years) {
    var details = document.createElement("details");
    details.id = year;

    var summary = document.createElement("summary");

    summary.append(year);

    details.append(summary, await createMonthsDetails(months, year));

    var yearsContainer = document.getElementById("years_container");

    yearsContainer.append(details);
  }
};

export default createYearsDetails;
