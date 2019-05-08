import numeral from "numeral";

numeral.register("locale", "ac0", {
  delimiters: {
    thousands: ",",
    decimal: "."
  },
  abbreviations: {
    thousand: "K",
    million: "M",
    billion: "B",
    trillion: "T"
  }
});
numeral.locale("ac0");
