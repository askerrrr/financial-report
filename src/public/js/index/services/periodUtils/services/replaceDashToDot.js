var replaceDashToDot = (date) =>
  date
    .split("")
    .map((e) => e.replace("-", "."))
    .join("");

export default replaceDashToDot;
