/**
 * https://polkadot.js.org/docs/util-crypto/examples/validate-address
 * Validate Address]
 * - This function will return true if the address is a legitamate
 *      Polkadot address and false if it is not
 * - Work both with Ed25519 and Sr25519 key types
 */

const { decodeAddress, encodeAddress } = require('@polkadot/keyring');
const { hexToU8a, isHex } = require('@polkadot/util');

// const address = '5GrpknVvGGrGH3EFuURXeMrWHvbpj3VfER1oX5jFtuGbfzCE';
// const address = 'b6pXwXh81QxhFKALjtQerXej78jVGpwzjQSpPiXF6JagqS2'; // Shibuya
const address = 'b6pXwXh81QxhFKALjtQerXej78jVGpwzjQSpPiXF6Jiehav'; // false-Shibuya

const isValidAddressPolkadotAddress = () => {
  try {
    encodeAddress(
      isHex(address)
        ? hexToU8a(address)
        : decodeAddress(address)
    );

    return true;
  } catch (error) {
    return false;
  }
};

const isValid = isValidAddressPolkadotAddress();

console.log(isValid);