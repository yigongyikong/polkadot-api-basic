import { encodeAddress, decodeAddress } from '@polkadot/keyring';
import { isHex, hexToU8a } from '@polkadot/util';


const testAcnt1 = 'WytApRyNaNQQZFF8rULKGCSjUkCBM2oAMgtMhpNE3XemDmg';
const testAcnt2 = 'b42omy85WkT84v8xUq2MLmrUj5hVUtJiQFviE4Bda9mjH2V';
const testAcnt3 = 'Y53RfWNhshnPNd6asGBrfAFPwh36fx7jMkFyJMDdZoZ81w1';
const testAcnt4 = 'YevBm73QzETMfh6oWAmC5ckUfxevU39s3hvepxhqpiU5NZG';
const testAcnt5 = 'WcuUpmspMcykJdngmUW9nC4YssuoqvRKnMh69gkmBvFFM95';
const testAcnt6 = 'Wfdf9nC4YssuoqvRKnMh69gkmBvFFM95';

const isValidAddressPolkadotAddress = (address) => {
    try {
        // address = address_grow_icz_hotwallet;
        console.log(address);
        console.log(isHex(address)); // false
        console.log(hexToU8a(address));
        console.log(decodeAddress(address));
        console.log(encodeAddress( isHex(address) ? hexToU8a(address) : decodeAddress(address) ));

        console.log('valid');
        // return true;

        /*WcuUpmspMcykJdngmUW9nC4YssuoqvRKnMh69gkmBvFFM95
        false
        Uint8Array(24) [
          12, 0,   0,  0,  12,   0, 13,  0,
           0, 9,  12, 64,   0,   0,  0,  0,
           0, 6, 144,  0, 176, 255,  9, 80
        ]
        Uint8Array(32) [
           30,  53,   5, 146, 185, 136, 213, 93,
          220, 137, 199,   4, 161, 157, 249, 55,
          182, 147, 120, 145,  99, 242, 212, 67,
           80,  43,  85, 191,  60, 195, 238, 12
        ]
        5CkK3Xoo37ysXUbxCU2P882nTqAnqdDgJarYrSUttpvHfGbQ
        valid*/
    } catch (error) {
        console.log('inValid');
        // return false;
    }
};


isValidAddressPolkadotAddress(testAcnt6);


// decode.ts
/*
// Copyright 2017-2023 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';
import type { Prefix } from './types.js';

// Original implementation: https://github.com/paritytech/polka-ui/blob/4858c094684769080f5811f32b081dd7780b0880/src/polkadot.js#L6
import { isHex, isU8a, u8aToU8a } from '@polkadot/util';

import { base58Decode } from '../base58/index.js';
import { checkAddressChecksum } from './checksum.js';
import { defaults } from './defaults.js';

export function decodeAddress (encoded?: HexString | string | Uint8Array | null, ignoreChecksum?: boolean, ss58Format: Prefix = -1): Uint8Array {
    if (!encoded) {
      throw new Error('Invalid empty address passed');
    }
  
    if (isU8a(encoded) || isHex(encoded)) {
      return u8aToU8a(encoded);
    }
  
    try {
      const decoded = base58Decode(encoded);
  
      if (!defaults.allowedEncodedLengths.includes(decoded.length)) {
        throw new Error('Invalid decoded address length');
      }
  
      const [isValid, endPos, ss58Length, ss58Decoded] = checkAddressChecksum(decoded);
  
      if (!isValid && !ignoreChecksum) {
        throw new Error('Invalid decoded address checksum');
      } else if (ss58Format !== -1 && ss58Format !== ss58Decoded) {
        throw new Error(`Expected ss58Format ${ss58Format}, received ${ss58Decoded}`);
      }
  
      return decoded.slice(ss58Length, endPos);
    } catch (error) {
      throw new Error(`Decoding ${encoded}: ${(error as Error).message}`);
    }
  }*/


  // decode.ts
  /*export function checkAddressChecksum (decoded: Uint8Array): [boolean, number, number, number] {
    const ss58Length = (decoded[0] & 0b0100_0000) ? 2 : 1;
    const ss58Decoded = ss58Length === 1
      ? decoded[0]
      : ((decoded[0] & 0b0011_1111) << 2) | (decoded[1] >> 6) | ((decoded[1] & 0b0011_1111) << 8);
  
    // 32/33 bytes public + 2 bytes checksum + prefix
    const isPublicKey = [34 + ss58Length, 35 + ss58Length].includes(decoded.length);
    const length = decoded.length - (isPublicKey ? 2 : 1);
  
    // calculate the hash and do the checksum byte checks
    const hash = sshash(decoded.subarray(0, length));
    const isValid = (decoded[0] & 0b1000_0000) === 0 && ![46, 47].includes(decoded[0]) && (
      isPublicKey
        ? decoded[decoded.length - 2] === hash[0] && decoded[decoded.length - 1] === hash[1]
        : decoded[decoded.length - 1] === hash[0]
    );
  
    return [isValid, length, ss58Length, ss58Decoded];
  }*/

  // 123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz