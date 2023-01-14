import jsSHA from "jssha";

const DEFAULT_ENCRYPT_ALGORITHM = "SHA-512";

export function encrypt(string, algorithm = DEFAULT_ENCRYPT_ALGORITHM) {
  const alg = new jsSHA(algorithm, "TEXT", { encoding: "UTF8" });
  alg.update(string);
  return alg.getHash("HEX");
}

export function urlServer(
  string,
  port = 8000,
  algorithm = DEFAULT_ENCRYPT_ALGORITHM
) {
  return `http://127.0.0.1:${port}/${encrypt(string, algorithm)}/`;
}
