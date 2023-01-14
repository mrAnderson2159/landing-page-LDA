import jsSHA from "jssha";

export function encrypt(string, algorithm = "SHA-512") {
  const alg = new jsSHA(algorithm, "TEXT", { encoding: "UTF8" });
  alg.update(string);
  return alg.getHash("HEX");
}
