var checkPriceAndDiscount = (price, discount) => {
  var dataIsValid = false;

  if (!Number.isFinite(price) || price <= 0) {
    return { dataIsValid };
  }

  if (!Number.isFinite(discount) || discount < 0 || discount > 100) {
    return { dataIsValid };
  }

  return { dataIsValid: true };
};

export default checkPriceAndDiscount;
