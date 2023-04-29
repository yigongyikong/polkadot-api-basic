import {
    cryptoWaitReady
} from '@polkadot/util-crypto';
import { u8aToHex } from '@polkadot/util';
import { Keyring } from '@polkadot/keyring';


const revisitCrypto = async () => {
    const keyring = new Keyring({ type: 'sr25519', ss58Format: 5 });

    const testMnemonic = 'slice bronze until cabin gold cradle foil carbon measure owner topple dignity';

    // ed25519', Not need to cryptoWaitReady();
    const testAddFromMnemonic_ed = keyring.addFromMnemonic(testMnemonic, { test: 1 }, 'ed25519');
    console.log(`testAddFromMnemonic_ed-address : ${testAddFromMnemonic_ed.address}`); // XkpVKDM2UmEjgmQZPCRNYB2UKpFQRWALQGeMwr9XEzfqbcN
    console.log(`testAddFromMnemonic_ed-addressRaw : ${u8aToHex(testAddFromMnemonic_ed.addressRaw)}`); // 0x507a6a58b697170027931d736ed0d0ddce1fb2b077879bfa9d2b95fad14eb6c5
    console.log(`testAddFromMnemonic_ed-meta : ${testAddFromMnemonic_ed.meta['test']}`); // 1
    console.log(`testAddFromMnemonic_ed-publicKey : ${u8aToHex(testAddFromMnemonic_ed.publicKey)}`); // 0x507a6a58b697170027931d736ed0d0ddce1fb2b077879bfa9d2b95fad14eb6c5

    await cryptoWaitReady();
    // 'sr25519'
    const testAddFromMnemonic_sr = keyring.addFromMnemonic(testMnemonic, { test: 1 }, 'sr25519');
    console.log(`testAddFromMnemonic_sr-address : ${testAddFromMnemonic_sr.address}`); // b42omy85WkT84v8xUq2MLmrUj5hVUtJiQFviE4Bda9mjH2V | shibuya
    console.log(`testAddFromMnemonic_sr-addressRaw : ${u8aToHex(testAddFromMnemonic_sr.addressRaw)}`); // 0xe24fc1367224c25f0eb4a12d5013386aee19b194dc23b9384b8f975ea7b0610e
    console.log(`testAddFromMnemonic_sr-meta : ${testAddFromMnemonic_sr.meta['test']}`); // 1
    console.log(`testAddFromMnemonic_sr-publicKey : ${u8aToHex(testAddFromMnemonic_sr.publicKey)}`); // 0xe24fc1367224c25f0eb4a12d5013386aee19b194dc23b9384b8f975ea7b0610e

    // 'ecdsa', Not need to cryptoWaitReady();
    const testAddFromMnemonic_ec = keyring.addFromMnemonic(testMnemonic, { test: 1 }, 'ecdsa');
    console.log(`testAddFromMnemonic_ec-address : ${testAddFromMnemonic_ec.address}`); // XCWdpqNyJTQuF2vygFK1dLjxfd9M3nLSNbpWSjhffoZH5dV
    console.log(`testAddFromMnemonic_ec-addressRaw : ${u8aToHex(testAddFromMnemonic_ec.addressRaw)}`); // 0x37d676896572575d8eeb574ce557a487872fda7de5899f52201c051bbc1b2e11
    console.log(`testAddFromMnemonic_ec-meta : ${testAddFromMnemonic_ec.meta['test']}`); // 1
    console.log(`testAddFromMnemonic_ec-publicKey : ${u8aToHex(testAddFromMnemonic_ec.publicKey)}`); // 0x028cf142e9c7235598935dca16da534488eb247ae7613ff756d51e1cc03520dce1

    // 'ethereum', Not need to cryptoWaitReady();
    const testAddFromMnemonic_eth = keyring.addFromMnemonic(testMnemonic, { test: 1 }, 'ethereum');
    console.log(`testAddFromMnemonic_eth-address : ${testAddFromMnemonic_eth.address}`); // 0x887d2B6CC74053CD0A115243d399b27c8afBcA2C
    console.log(`testAddFromMnemonic_eth-addressRaw : ${u8aToHex(testAddFromMnemonic_eth.addressRaw)}`); // 0x887d2b6cc74053cd0a115243d399b27c8afbca2c
    console.log(`testAddFromMnemonic_eth-meta : ${testAddFromMnemonic_eth.meta['test']}`); // 1
    console.log(`testAddFromMnemonic_eth-publicKey : ${u8aToHex(testAddFromMnemonic_eth.publicKey)}`); // 0x0201d40658b1fc247706d65b6e2556bb7072c28e6c7919ce6f030dcdd9114a3307
}

revisitCrypto().catch(console.error).finally(() => process.exit());