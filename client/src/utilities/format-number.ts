const formatNumberShort = (n: number, decimals = 1) => {
  if (n >= 1_000_000_000_000) return (n / 1_000_000_000_000).toFixed(decimals) + "T";
  else if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(decimals) + "B";
  else if (n >= 1_000_000) return (n / 1_000_000).toFixed(decimals) + "M";
  else if (n >= 1_000) return (n / 1_000).toFixed(decimals) + "K";
  else return n.toString();
};

export default formatNumberShort;
