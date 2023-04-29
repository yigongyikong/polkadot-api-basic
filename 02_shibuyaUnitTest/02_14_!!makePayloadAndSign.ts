import { Keyring } from '@polkadot/keyring';
import { WsProvider } from '@polkadot/rpc-provider';
import { ApiPromise } from '@polkadot/api';
import { createType } from '@polkadot/types';
import { u8aToHex } from '@polkadot/util';

const makePayloadAndSign = async () => {
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise({ provider });
    const keyring = new Keyring({ type: 'sr25519', ss58Format: 5 });

    await api.isReady;

    const testMnemonic = 'slice bronze until cabin gold cradle foil carbon measure owner topple dignity';

    // await cryptoWaitReady();
    // 'sr25519'
    const testAddFromMnemonic_sr = keyring.addFromMnemonic(testMnemonic, { test: 1 }, 'sr25519');
    console.log(`testAddFromMnemonic_sr-address : ${testAddFromMnemonic_sr.address}`); // b42omy85WkT84v8xUq2MLmrUj5hVUtJiQFviE4Bda9mjH2V | shibuya

    const sampleid = 'VwJHxi1vTNdnJ2KXfQ7tWL8ERiUGv9bwhmf5RDWKGySQmsy';

    const transaction = api.tx.balances.transfer(sampleid, BigInt(2000000000000000000));

    // Get nonce
    const { nonce: non } = await api.query.system.account(testAddFromMnemonic_sr.address);
    console.log('Nonce : ' + non);

    // Create a payload
    const payload = createType('ExtrinsicPayload', {
        method: transaction.toHex(),
        nonce: non.toHex(),
        specVersion: api.runtimeVersion.specVersion,
        genesisHash: api.genesisHash,
        blockHash: api.genesisHash
    }, { version: 4 });
    console.log(payload);

    const signature = testAddFromMnemonic_sr.sign(payload.toU8a(true));

    const signHex = u8aToHex(signature);
    console.log(signHex);

    transaction.addSignature(testAddFromMnemonic_sr.address, signHex, payload.toU8a());

    // const hash = await transaction.send();
    // console.log(hash);
}

makePayloadAndSign().catch(console.error).finally(() => process.exit());