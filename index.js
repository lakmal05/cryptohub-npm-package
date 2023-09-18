// ** This function generates a random crypto ID based on the input data or a default length of 15 characters if input data is undefined or null.
export const cryptoId = (inputData) => {
  if (typeof inputData === "undefined" || inputData === null) {
    //** If inputData is undefined or null, generate a default random ID of length 15 characters.*/
    const length = 17;
    const characters =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let _cryId = "";
    // ** Generate the random ID by iterating through the desired length.*/
    for (let i = 0; i < length; i++) {
      if (i % 2 === 0) {
        _cryId += Math.floor(Math.random() * 10);
      } else {
        const randomIndex = Math.floor(Math.random() * characters.length);
        _cryId += characters.charAt(randomIndex);
      }
    }
    return _cryId;
  } else {
    //** If inputData is provided, generate a random ID of the specified length. */
    const characters =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let randomId = "";

    for (let i = 0; i < inputData; i++) {
      if (i % 2 === 0) {
        randomId += Math.floor(Math.random() * 10); // **Insert a random number for even positions
      } else {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomId += characters.charAt(randomIndex);
      }
    }
    //**  Check if the generated random ID is equal to "0" and return 9 if it is */
    return randomId == "0" ? 9 : randomId;
  }
};
export const encryptdata = (data, secret_key) => {
  //** The private key used for encryption */;
  const _privateKey = "asdfasdf";
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
