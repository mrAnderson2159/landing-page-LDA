import jsSHA from "jssha";

const DEFAULT_ENCRYPT_ALGORITHM = "SHA-512";

export function encrypt(string, algorithm = DEFAULT_ENCRYPT_ALGORITHM) {
  const alg = new jsSHA(algorithm, "TEXT", { encoding: "UTF8" });
  alg.update(string);
  return alg.getHash("HEX");
}

export function urlServer(host, string, algorithm = DEFAULT_ENCRYPT_ALGORITHM) {
  return `${host}/${encrypt(string, algorithm)}/`;
}
