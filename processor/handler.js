'use strict';

const { randomBytes, createHash } = require('crypto') ;

const { getCollectionAddress } = require('./services/addressing');
const { TransactionHandler } = require('sawtooth-sdk/processor/handler');
const { InvalidTransaction } = require('sawtooth-sdk/processor/exceptions');
const { decode, encode } = require('./services/encoding');


const FAMILY_NAME = 'cryptomoji';
const FAMILY_VERSION = '0.1';
const NAMESPACE = '5f4d76';

/**
 * A Cryptomoji specific version of a Hyperledger Sawtooth Transaction Handler.
 */
class MojiHandler extends TransactionHandler {
  /**
   * The constructor for a TransactionHandler simply registers it with the
   * validator, declaring which family name, versions, and namespaces it
   * expects to handle. We'll fill this one in for you.
   */
  constructor () {
    console.log('Initializing cryptomoji handler with namespace:', NAMESPACE);
    super(FAMILY_NAME, [ FAMILY_VERSION ], [ NAMESPACE ]);
  }

  /**
   * The apply method is where the vast majority of all the work of a
   * transaction processor happens. It will be called once for every
   * transaction, passing two objects: a transaction process request ("txn" for
   * short) and state context.
   *
   * Properties of `txn`:
   *   - txn.payload: the encoded payload sent from your client
   *   - txn.header: the decoded TransactionHeader for this transaction
   *   - txn.signature: the hex signature of the header
   *
   * Methods of `context`:
   *   - context.getState(addresses): takes an array of addresses and returns
   *     a Promise which will resolve with the requested state. The state
   *     object will have keys which are addresses, and values that are encoded
   *     state resources.
   *   - context.setState(updates): takes an update object and returns a
   *     Promise which will resolve with an array of the successfully
   *     updated addresses. The updates object should have keys which are
   *     addresses, and values which are encoded state resources.
   *   - context.deleteState(addresses): deletes the state for the passed
   *     array of state addresses. Only needed if attempting the extra credit.
   */
  apply (txn, context) {
    // Enter your solution here
    // (start by decoding your payload and checking which action it has)
      try {
          const payload = decode(txn.payload);
          console.log("THE TRANSACTION: ", txn);
          const  publicKey = txn.header.signerPublicKey;
          console.log('PAYLOAD IS: ', payload);
          console.log('PUBLIC KEY IS: ', publicKey);

          switch (payload.action) {
              case 'CREATE_COLLECTION':
                  console.log("GOT A CREATE COLLECTION REQUEST");
                const collectionAddress = getCollectionAddress(publicKey);
                console.log("CREATED COLLECTION ADDRESS: ", collectionAddress, "WITH LENGTH: ", collectionAddress.length);

              return context.getState([ collectionAddress ]).then(state => {
                  if (state[collectionAddress].length > 0) {
                      throw new InvalidTransaction('Collection already exists');
                  }
                  const update = {};
                  update[collectionAddress] = encode({ key: publicKey, moji: [collectionAddress,collectionAddress,collectionAddress],});
                  return context.setState(update);
                });

                break;
              default:
                throw new InvalidTransaction('Invalid action !!');
          }
      } catch (ex) {
          throw new InvalidTransaction('Unable to payload !!');
      }

      return new Promise((_, reject) => reject(err));

  }
}

module.exports = MojiHandler;
