import { _HASH, _CRYPTO, _PRIVATEKEY } from "./constance.js";

const _hash = _HASH; //** Hash Constant Value for Hash Function */
const _crypto = _CRYPTO; //**This is the Value For Crypot Encrypt Funtion */

// ** This function generates a random crypto ID based on the input data or a default length of 15 characters if input data is undefined or null.
export const cryptoId = (inputData) => {
  if (typeof inputData === "undefined" || inputData === null) {
    //** If inputData is undefined or null, generate a default random ID of length 15 characters.*/
    const length = 17;

    let _cryId = "";
    // ** Generate the random ID by iterating through the desired length.*/
    for (let i = 0; i < length; i++) {
      if (i % 2 === 0) {
        _cryId += Math.floor(Math.random() * 10);
      } else {
        const randomIndex = Math.floor(Math.random() * _crypto.length);
        _cryId += _crypto.charAt(randomIndex);
      }
    }
    return _cryId;
  } else {
    //** If inputData is provided, generate a random ID of the specified length. */

    let randomId = "";

    for (let i = 0; i < inputData; i++) {
      if (i % 2 === 0) {
        randomId += Math.floor(Math.random() * 10); // **Insert a random number for even positions
      } else {
        const randomIndex = Math.floor(Math.random() * _crypto.length);
        randomId += _crypto.charAt(randomIndex);
      }
    }
    //**  Check if the generated random ID is equal to "0" and return 9 if it is */
    return randomId == "0" ? 9 : randomId;
  }
};
export const encryptdata = (data, secret_key) => {
  //** The private key used for encryption */;
  //**Check if data and secret_key are both provided and valid */
  if (!data && !secret_key) {
    throw new Error("Enter valid data");
  } else if (typeof secret_key === undefined || secret_key === null) {
    throw new Error("Enter secrt ky");
  } else {
    let encrypted = "";
    for (let i = 0; i < data.length; i++) {
      //**  Convert the character to its ASCII code and pad it to 8 characters*/
      const charCode = data.charCodeAt(i).toString(16).padStart(2, "0");
      encrypted += charCode;
    }
    return encrypted;
  }
};

export const decryptdata = async (encryptedData, secret_key) => {
  //** Check if encryptedData and secret_key are both provided and valid*/
  if (!encryptedData || !secret_key) {
    throw new Error("Enter valid data");
  } else if (typeof secret_key === "undefined" || secret_key === null) {
    throw new Error("Enter secret key");
  } else {
    let _decrypted = "";
    for (let i = 0; i < encryptedData.length; i += 2) {
      //** Extract 8 characters, convert them back to ASCII, and add to the result */
      const hexCode = encryptedData.substr(i, 2);
      const charCode = parseInt(hexCode, 16);
      _decrypted += String.fromCharCode(charCode);
    }
    return _decrypted;
  }
};

//** Function to hash data based on character codes and a predefined hash string */
export const hashdata = (data) => {
  //**  Initialize an empty string to store the hash result*/
  let hash = "";
  //**  Iterate through each character in the input data*/
  for (let i = 0; i < data.length; i++) {
    //** Get the current character
    const char = data.charAt(i);
    //** Get the character code of the current character*/
    const charCode = char.charCodeAt(0);
    //** Use the character code to select a character from the predefined hash string*/
    //** This is done by taking the remainder when dividing the charCode by the length of the hash string*/
    const transformedChar = _hash[charCode % _hash.length];
    //** Append the selected character to the hash result */
    hash += transformedChar;
  }
  return hash;
};

export const sha256Hash = async (password) => {
  const buffer = new TextEncoder().encode(password);
  const h = new Uint32Array([
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c,
    0x1f83d9ab, 0x5be0cd19,
  ]);

  for (let i = 0; i < buffer.length; i += 64) {
    let [a, b, c, d, e, f, g, hValue] = [...h];

    const w = new Uint32Array(64);
    for (let j = 0; j < 64; j++) {
      w[j] =
        j < 16
          ? (buffer[i + j * 4] << 24) |
            (buffer[i + j * 4 + 1] << 16) |
            (buffer[i + j * 4 + 2] << 8) |
            buffer[i + j * 4 + 3]
          : ((w[j - 2] >>> 17) ^ (w[j - 2] >>> 19) ^ (w[j - 2] >>> 10)) +
            w[j - 7] +
            ((w[j - 15] >>> 7) ^ (w[j - 15] >>> 18) ^ (w[j - 15] >>> 3)) +
            w[j - 16];
    }

    for (let j = 0; j < 64; j++) {
      const S1 = (e >>> 6) ^ (e >>> 11) ^ (e >>> 25);
      const ch = (e & f) ^ (~e & g);
      const temp1 =
        hValue +
        S1 +
        ch +
        new Uint32Array([
          0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b,
          0x59f111f1, 0x923f82a4, 0xab1c5ed5,
        ])[j] +
        w[j];
      const S0 = (a >>> 2) ^ (a >>> 13) ^ (a >>> 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = S0 + maj;

      hValue = g;
      g = f;
      f = e;
      e = (d + temp1) >>> 0;
      d = c;
      c = b;
      b = a;
      a = (temp1 + temp2) >>> 0;
    }

    hValue = (hValue + h[0]) >>> 0;
    g = (g + h[1]) >>> 0;
    f = (f + h[2]) >>> 0;
    e = (e + h[3]) >>> 0;
    d = (d + h[4]) >>> 0;
    c = (c + h[5]) >>> 0;
    b = (b + h[6]) >>> 0;
    a = (a + h[7]) >>> 0;

    h[0] = a;
    h[1] = b;
    h[2] = c;
    h[3] = d;
    h[4] = e;
    h[5] = f;
    h[6] = g;
    h[7] = hValue;
  }

  const sha = h.map((value) => value.toString(16).slice(-8)).join("");
};
