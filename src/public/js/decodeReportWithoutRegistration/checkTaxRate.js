var checkTaxRate = async (taxRate) => {
  if (taxRate >= 0 && taxRate <= 100) {
    return { taxRate };
  }

  alert("Введите корректный процент налогообложения");
  throw new Error("Введите корректный процент налогообложения");
};

export default checkTaxRate;
