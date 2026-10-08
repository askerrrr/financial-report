var tableHeadersAtrbs = [
  "price-can-be-bifurcated",
  "discount-can-be-bifurcated",
  "discountedPrice-can-be-bifurcated",
  "clubDiscounted-price-can-be-bifurcated",
];

var setThColSpan = () => {
  tableHeadersAtrbs.forEach((attribute) => {
    document.querySelectorAll(`th[${attribute}]`).forEach((th) => {
      th.colSpan = 2;
    });
  });
};
export default setThColSpan;
