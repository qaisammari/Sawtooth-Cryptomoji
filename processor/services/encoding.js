'use strict';

/**
 * A function that takes an object and returns it encoded as JSON Buffer.
 * Should work identically to the client version. Feel free to copy and paste
 * any work you did there.
 *
 * Example:
 *   const encoded = encode({ hello: 'world', foo: 'bar' })
 *   console.log(encoded)  // <Buffer 7b 22 66 6f 6f 22 3a 22 62 61 72 22 ... >
 *   console.log(encoded.toString())  // '{"foo":"bar","hello":"world"}'
 *
 * Hint:
 *   Remember that all transactions and blocks must be generated
 *   deterministically! JSON is convenient, but you will need to sort
 *   your object's keys or random transactions may fail.
 */
const encode = object => {
  // Enter your solution here
    console.log("WE GOT AN OBJECT TO ENCODE: ", object);
    console.log("STRINGIFY THE OBJ: ", JSON.stringify(object));
    console.log("SORT THE OBJ: ", JSON.stringify(object, Object.keys(object).sort()));
    console.log("BUFFER THE SORTED OBJ: ", Buffer.from(JSON.stringify(object, Object.keys(object).sort())));

    return Buffer.from(JSON.stringify(object, Object.keys(object).sort()));

};

/**
 * A function that takes a JSON Buffer and decodes it into an object. Unlike
 * the client version, there is no need to handle base64 strings.
 */
const decode = buffer => {
  // Your code here

    console.log("data to encode as buffer: ", buffer);
    const jsonObj = JSON.parse(buffer.toString());
    console.log("JSON DECODED OBJ: ", jsonObj);

    return jsonObj;

};

module.exports = {
  encode,
  decode
};
