var calcPaymentsMinusAllСommissions = async ({
  payoutsPerProduct,
  skuStorageCost,
  fines,
}) => payoutsPerProduct - skuStorageCost - fines;

export default calcPaymentsMinusAllСommissions;
