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
import {
    createSigningPayload,
} from '@substrate/txwrapper-core/lib/core/construct';
import { EXTRINSIC_VERSION } from '@polkadot/types/extrinsic/v4/Extrinsic';

const offlineSignWssTransfer = async () => {
    // Create a new instance of the api
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise({ provider });

    await api.isReady;

    const testAcnt1 = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U';
    const testAcnt2 = '5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA';

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
    // console.log(block_api.block.header.number.toHex());
    const blockHash_api = await api.rpc.chain.getBlockHash();
    // console.log(blockHash_api.toHex());
    const genesisHash_api = await api.genesisHash;
    // console.log(genesisHash_api.toHex());
    const metadataRpc_api = await api.rpc.state.getMetadata();
    // console.log(metadataRpc_api.toHex());
    const runtime_api = await api.rpc.state.getRuntimeVersion();
    // console.log(runtime_api.specVersion.toNumber());
    // console.log('===== ===== =====');
    // console.log(runtime_api.transactionVersion.toNumber());

    const registry_api = getRegistry({
        chainName: 'shibuya',
        specName: runtime_api.specVersion.toNumber(),
        specVersion: runtime_api.transactionVersion.toNumber(),
        metadataRpc: metadataRpc_api.toHex(),
    });
    // console.log(registry_api);

    const accountBalInfo = await api.derive.balances.account(testAcnt2);
    const nonceTestAcnt2 = accountBalInfo.accountNonce.toString();
    // console.log(`nonceTestAcnt2: ${nonceTestAcnt2}`);

    const unsigned_api = methods.balances.transfer(
        {
            value: '2000000000000000', // 200000000000000000
            dest: testAcnt1, // Bob
        },
        {
            // address: deriveAddress(testAcnt2Key.publicKey, 42), // TODO, use correct prefix
            address: testAcnt2, // TODO, use correct prefix
            blockHash: blockHash_api.toHex(),
            blockNumber: registry_api
                .createType('BlockNumber', block_api.block.header.number.toHex())
                .toNumber(),
            eraPeriod: 64,
            genesisHash: genesisHash_api.toHex(),
            metadataRpc: metadataRpc_api.toHex(),
            // nonce: 0, // Assuming this is Alice's first tx on the chain
            nonce: Number(nonceTestAcnt2),
            specVersion: runtime_api.specVersion.toNumber(),
            tip: 0,
            transactionVersion: runtime_api.transactionVersion.toNumber(),
        },
        {
            metadataRpc: metadataRpc_api.toHex(),
            registry: registry_api,
        }
    );
    // console.log(unsigned_api);


    // Decode an unsigned transaction.
    const decodedUnsigned_api = decode(unsigned_api, {
        metadataRpc: metadataRpc_api.toHex(),
        registry: registry_api,
    });
    // console.log(`\decodedUnsigned_api: ${decodedUnsigned_api}`);
    // console.log(decodedUnsigned_api);
    console.log(
        // TODO all the log messages need to be updated to be relevant to the method used
        `\nDecoded Transaction\n  To: ${decodedUnsigned_api.method.args.dest}\n` +
        `  Amount: ${decodedUnsigned_api.method.args.value}`
    );

    // Construct the signing payload from an unsigned transaction.
    const signingPayload_api = construct.signingPayload(unsigned_api, { registry: registry_api });
    console.log(`\nPayload to Sign: ${signingPayload_api}`);

    // Decode the information from a signing payload.
    const payloadInfo_api = decode(signingPayload_api, {
        metadataRpc: metadataRpc_api.toHex(),
        registry: registry_api,
    });
    console.log(
        // TODO all the log messages need to be updated to be relevant to the method used
        `\nDecoded Transaction\n  To: ${payloadInfo_api.method.args.dest}\n` +
        `  Amount: ${payloadInfo_api.method.args.value}`
    );

    // Sign a payload. This operation should be performed on an offline device.
    // const signature = signWith(alice, signingPayload, {
    const signature_api = signWith(testAcnt2Key, signingPayload_api, {
        metadataRpc: metadataRpc_api.toHex(),
        registry: registry_api,
    });
    // console.log(`\nSignature: ${signature_api}`);

    // Encode a signed transaction.
    const tx_api = construct.signedTx(unsigned_api, signature_api, {
        metadataRpc: metadataRpc_api.toHex(),
        registry: registry_api,
    });
    console.log(`\nTransaction to Submit: ${tx_api}`);


    // Calculate the tx hash of the signed transaction offline.
    const expectedTxHash_api = construct.txHash(tx_api);
    // console.log(`\nExpected Tx Hash: ${expectedTxHash_api}`);

    // Send the tx to the node. Since `txwrapper` is offline-only, this
    // operation should be handled externally. Here, we just send a JSONRPC
    // request directly to the node.
    // const actualTxHash = await rpcToLocalNode('author_submitExtrinsic', [tx]);
    /*const actualTxHash_api = await api.rpc.author.submitExtrinsic(tx_api);
    console.log(`Actual Tx Hash: ${actualTxHash_api}`);

    // Decode a signed payload.
    const txInfo_api = decode(tx_api, {
        metadataRpc: metadataRpc_api.toHex(),
        registry: registry_api,
    });
    console.log(
        // TODO all the log messages need to be updated to be relevant to the method used
        `\nDecoded Transaction\n  To: ${txInfo_api.method.args.dest}\n` +
        `  Amount: ${txInfo_api.method.args.value}\n`
    );*/

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