'use strict';

const { randomBytes, createHash } = require('crypto') ;

const { getCollectionAddress } = require('./services/addressing');
const { TransactionHandler } = require('sawtooth-sdk/processor/handler');
const { InvalidTransaction } = require('sawtooth-sdk/processor/exceptions');
const { decode, encode } = require('./services/encoding');
const createCollection = require('./helpers/create_actions');
const selectSire = require('./helpers/select_sire');


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
          let payload = null;
          try {
              payload = decode(txn.payload);
          } catch (err) {
              throw new InvalidTransaction('Failed to decode payload: ' + err);
          }

          const publicKey = txn.header.signerPublicKey;

          console.log('......Public key', publicKey);
          console.log('......txn signature ', txn.signature);
          console.log('......context ', context);


          switch (payload.action) {
            case 'CREATE_COLLECTION':
                return createCollection(context, publicKey, txn.signature);
            case 'SELECT_SIRE':
                return selectSire(context, publicKey, payload);
            case 'BREED_MOJI':
            // return breedMoji(context, publicKey, payload, txn.signature);
            case 'CREATE_OFFER':
            // return createOffer(context, publicKey, payload);
            case 'CANCEL_OFFER':
            // return cancelOffer(context, publicKey, payload);
            case 'ADD_RESPONSE':
            // return addResponse(context, publicKey, payload);
            case 'ACCEPT_RESPONSE':
            // return acceptResponse(context, publicKey, payload);
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
