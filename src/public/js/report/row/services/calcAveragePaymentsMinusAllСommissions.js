var calcAveragePaymentsMinusAllСommissions = async (
  paymentsMinusAllСommissions,
  qty
) => {
  if (paymentsMinusAllСommissions) {
    return paymentsMinusAllСommissions / qty;
  }

  return 0;
};

export default calcAveragePaymentsMinusAllСommissions;
