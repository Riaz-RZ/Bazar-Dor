export const toBanglaUnit = (unit: string) => {
  const units: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    piece: "পিস",
    dozen: "ডজন",
  };

  return units[unit.toLowerCase()] || unit;
};

export const toBanglaNumber = (value: number | string) => {
  return value
    .toString()
    .replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);
};