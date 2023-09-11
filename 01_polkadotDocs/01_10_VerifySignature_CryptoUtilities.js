/**
 * https://polkadot.js.org/docs/util-crypto/examples/verify-signature
 * Verify Signature]
 * - This function will return true
 *    if a message passed as parameter has been signed
 *    by the passed address
 */
const { cryptoWaitReady, decodeAddress, signatureVerify } = require('@polkadot/util-crypto');
const { u8aToHex } = require('@polkadot/util');

const isValidSignature = (signedMessage, signature, address) => {
  const publicKey = decodeAddress(address);
  const hexPublicKey = u8aToHex(publicKey);

  return signatureVerify(signedMessage, signature, hexPublicKey).isValid;
};

const main = async () => {
  //Some interfaces, such as using sr25519 however are only available via WASM
  await cryptoWaitReady();
  const isValid = isValidSignature(
    'This is a text message',
    '0x0024c0da6049dcdd9c206909a8da487b0d37cf0e80d357010795782d6923ac1af82e307a4479564799dbb9b4ef1f8353fb27973a8c43dce60a2725471ab5f2ef0d',
    'aRKc6KjTcDAsRcg5VkeWo9rkjgerZdBB27D2KgC4jsm9SVB'
  );
  console.log(isValid)
  // true
}

main();