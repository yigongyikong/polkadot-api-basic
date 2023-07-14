import { WsProvider } from '@polkadot/rpc-provider';
import { ApiPromise } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';
import { stringToU8a, u8aToHex } from '@polkadot/util';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import {
    construct,
    createMetadata,
    decode,
    deriveAddress,
    getRegistry,
    KeyringPair,
    methods,
    OptionsWithMeta
} from '@substrate/txwrapper-polkadot';
import { EXTRINSIC_VERSION } from '@polkadot/types/extrinsic/v4/Extrinsic';
import { getDappAddressEnum } from '@astar-network/astar-sdk-core';

const offlineSignWssTransfer = async () => {
    // Create a new instance of the api
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise({ provider });

    await api.isReady;

    const testAcnt1 = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U'; // dstAddr
    // const testAcnt1 = 'bZDGgVRhyFCcEMXKmWKLqqAUoGA9JMwY8F8fF8vaf4V3DJS'; // dstAddr

    const testAcnt2 = '5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA'; // sndAddr
    // const testAcnt2 = 'a9vf2HnVwUcNaHMmEDeCQxhAPWVWZNgwCs2S9fTXW3Jm6nT'; // sndAddr

    await cryptoWaitReady();

    const keyring = new Keyring({ type: 'sr25519' });
    const testAcnt2Mnemonic = 'slice bronze until cabin gold cradle foil carbon measure owner topple dignity';
    const testAcnt2Key = keyring.addFromUri(testAcnt2Mnemonic);
    console.log(
        "testAcnt2Key's SS58-Encoded Address:",
        deriveAddress(testAcnt2Key.publicKey, 42) // TODO, use correct prefix
    );
    // testAcnt2Key's SS58-Encoded Address: 5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA

    const block_api = await api.rpc.chain.getBlock();
    const blockHash_api = await api.rpc.chain.getBlockHash(block_api.block.header.number.toHex());
    const genesisHash_api = await api.genesisHash;
    const metadataRpc_api = await api.rpc.state.getMetadata();
    const runtime_api = await api.rpc.state.getRuntimeVersion();

    const registry_api = getRegistry({
        chainName: 'shibuya',
        specName: runtime_api.specVersion.toNumber(),
        specVersion: runtime_api.transactionVersion.toNumber(),
        metadataRpc: metadataRpc_api.toHex(),
    });

    const accountBalInfo = await api.derive.balances.account(testAcnt2);
    const nonceTestAcnt2 = accountBalInfo.accountNonce.toString();
    console.log('===== ===== =====');

    const blockNumber_tmp = registry_api.createType('BlockNumber', block_api.block.header.number.toHex()).toString();
    const era_tmp = api.registry.createType('ExtrinsicEra', {
        current: blockNumber_tmp,
        period: 64,
    });

    const contractAddress = '0xc25d089a9b7bfba1cb10b794cd20c66ec1a9c712';
    // const stakeCall = await api.tx.dappsStaking.bondAndStake(getDappAddressEnum(contractAddress), BigInt(5000000000000000000));
    // const stakeCall = await api.tx.dappsStaking.unbondAndUnstake(getDappAddressEnum(contractAddress), BigInt(3000000000000000000));

    const unsigned_api = {
        // specVersion: runtime_api.specVersion.toNumber(),
        specVersion: runtime_api.specVersion.toString(),
        // transactionVersion: runtime_api.transactionVersion.toNumber(),
        transactionVersion: runtime_api.transactionVersion.toString(),
        address: testAcnt2,
        blockHash: blockHash_api.toHex(),
        blockNumber: blockNumber_tmp,
        era: era_tmp.toHex(),
        // era: 64,
        genesisHash: genesisHash_api.toHex(),
        method: api.tx.balances.transfer(testAcnt1, BigInt(1000000000000000000)).method.toHex(),
        // method: api.tx.dappsStaking.bondAndStake(getDappAddressEnum(contractAddress), BigInt(7000000000000000000)).method.toHex(),
        nonce: nonceTestAcnt2,
        signedExtensions: [
            'CheckNonZeroSender',
            'CheckSpecVersion',
            'CheckTxVersion',
            'CheckGenesis',
            'CheckMortality',
            'CheckNonce',
            'CheckWeight',
            'ChargeTransactionPayment',
        ],
        tip: '0x00000000000000000000000000000000',
        version: 4,
        metadataRpc: metadataRpc_api.toHex()
    }
    // console.log(unsigned_api);
    console.log('\n===== ===== =====\n');

    // Construct the signing payload from an unsigned transaction.
    const signingPayload_api = construct.signingPayload(unsigned_api, { registry: registry_api });
    console.log(`\nPayload to Sign: ${signingPayload_api}`);

    // Sign a payload. This operation should be performed on an offline device.
    // const signature = signWith(alice, signingPayload, {
    const signature_api = signWith(testAcnt2Key, signingPayload_api, {
        metadataRpc: metadataRpc_api.toHex(),
        registry: registry_api,
    });
    // const signature_api = '0x01123454e1ae90039aad9375f51ec3d4c08aaf12fea73a018e4f773841b111bf62e81a3b388766ef6a5a2f791b556cb19bfc36f09a68320157a672ed0c36dc868d';
    console.log(`\nSignature: ${signature_api}`);

    

    // Encode a signed transaction.
    const tx_api = construct.signedTx(unsigned_api, signature_api, {
        metadataRpc: metadataRpc_api.toHex(),
        registry: registry_api,
    });
    console.log(`\nTransaction to Submit: ${tx_api}`);

    // Send the tx to the node. Since `txwrapper` is offline-only, this
    // operation should be handled externally. Here, we just send a JSONRPC
    // request directly to the node.
    // const actualTxHash = await rpcToLocalNode('author_submitExtrinsic', [tx]);
    const actualTxHash_api = await api.rpc.author.submitExtrinsic(tx_api);
    console.log(`\nActual Tx Hash: ${actualTxHash_api}`);

}

offlineSignWssTransfer().catch(console.error).finally(() => process.exit());

/**
 * Signing function. Implement this on the OFFLINE signing device.
 *
 * @param pair - The signing pair.
 * @param signingPayload - Payload to sign.
 * @returns A signed ExtrinsicPayload returns a signature with the type `0x${string}` via polkadot-js.
 */
export function signWith(
    pair: KeyringPair,
    signingPayload: string,
    options: OptionsWithMeta
): `0x${string}` {
    const { registry, metadataRpc } = options;
    // Important! The registry needs to be updated with latest metadata, so make
    // sure to run `registry.setMetadata(metadata)` before signing.
    registry.setMetadata(createMetadata(registry, metadataRpc));

    const { signature } = registry
        .createType('ExtrinsicPayload', signingPayload, {
            version: EXTRINSIC_VERSION,
        })
        .sign(pair);

    return signature as unknown as `0x${string}`;
}
