const toKnots = (value: number, fractionDigits: number | undefined = 2) => {
  return Number((value * 1.943844).toFixed(fractionDigits));
};

export default toKnots;
