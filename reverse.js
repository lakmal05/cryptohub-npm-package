/**
 * Reverses a given string.
 *
 * @param {string} str - The input string to be reversed.
 * @returns {string} - The reversed string.
 */
export const reversestr = (str) => {
  // Initialize an empty string to store the reversed result.
  let reversedStr = "";

  // Loop through the characters of the input string in reverse order.
  for (let i = str.length - 1; i >= 0; i--) {
    // Append each character to the reversed string.
    reversedStr += str[i];
  }

  // Return the reversed string.
  return reversedStr;
};
