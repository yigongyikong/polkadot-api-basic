import { WsProvider } from '@polkadot/rpc-provider';
import { ApiPromise } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';
import { stringToU8a, u8aToHex } from '@polkadot/util';
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

const offlineSignRpcTransfer = async () => {
    // Create a new instance of the api
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    // const provider = new WsProvider('wss://hazel-gondolin-982d6.astar.bdnodes.net/para-websocket?auth=KpsskkIce4d-ogsKq42cUirhP29tqwW3bOH4sfpPuJ8');
    const api = new ApiPromise({ provider });

    const testAcnt1 = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U';
    const testAcnt2 = '5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA';

    await api.isReady;

    const keyring = new Keyring({ type: 'sr25519' });
    const testAcnt2Mnemonic = 'slice bronze until cabin gold cradle foil carbon measure owner topple dignity';
    const testAcnt2Key = keyring.addFromUri(testAcnt2Mnemonic);
    // console.log(
    //     "testAcnt2Key's SS58-Encoded Address:",
    //     deriveAddress(testAcnt2Key.publicKey, 42) // TODO, use correct prefix
    // );
    // testAcnt2Key's SS58-Encoded Address: 5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA

    const { block } = await rpcToLocalNode('chain_getBlock');
    const blockHash = await rpcToLocalNode('chain_getBlockHash');
    const genesisHash = await rpcToLocalNode('chain_getBlockHash', [0]);
    const metadataRpc = await rpcToLocalNode('state_getMetadata');
    // console.log(metadataRpc)
    const metadataRpc_api = await api.rpc.state.getMetadata();
    // console.log(metadataRpc_api);
    // console.log(metadataRpc_api.toHex());

    const { specVersion, transactionVersion, specName } = await rpcToLocalNode(
        'state_getRuntimeVersion'
    );
    console.log(specVersion)
    const specVersion_api = await api.runtimeVersion.specVersion.toString();
    console.log(specVersion_api)
    const registry = getRegistry({
        chainName: 'shibuya',
        specName,
        specVersion,
        metadataRpc,
    });

    const accountBalInfo = await api.derive.balances.account(testAcnt2);
    const nonceTestAcnt2 = accountBalInfo.accountNonce.toString();
    // console.log(`nonceTestAcnt2: ${nonceTestAcnt2}`); // nonceTestAcnt2: 19

    const unsigned = methods.balances.transfer(
        {
            value: '20000000000000',
            dest: testAcnt1, // Bob
        },
        {
            address: deriveAddress(testAcnt2Key.publicKey, 42), // TODO, use correct prefix
            blockHash,
            blockNumber: registry
                .createType('BlockNumber', block.header.number)
                .toNumber(),
            eraPeriod: 64,
            // eraPeriod: 128,
            genesisHash,
            metadataRpc,
            // nonce: 0, // Assuming this is Alice's first tx on the chain
            nonce: Number(nonceTestAcnt2),
            specVersion,
            tip: 0,
            transactionVersion,
        },
        {
            metadataRpc,
            registry,
        }
    );

    // Decode an unsigned transaction.
    const decodedUnsigned = decode(unsigned, {
        metadataRpc,
        registry,
    });
    // console.log(
    //     // TODO all the log messages need to be updated to be relevant to the method used
    //     `\nDecoded Transaction\n  To: ${decodedUnsigned.method.args.dest}\n` + // To: [object Object]
    //     `  Amount: ${decodedUnsigned.method.args.value}` // Amount: 20000000000000
    // );


    // Construct the signing payload from an unsigned transaction.
    const signingPayload = construct.signingPayload(unsigned, { registry });
    // console.log(`\nPayload to Sign: ${signingPayload}`); 
    // Payload to Sign: 0xa81f000000c499d3bbe996dfbb5549064d1890def4a9775a675b43b9203eefd810b21f650b0040e59c301215024c005c00000002000000ddb89973361a170839f80f152d2e9e38a376a5a7eccefcade763f46a8e56701912010dfa3428db09af032a13e49346b54ca75f3b955a2b4f64262ed780e62103

    // Decode the information from a signing payload.
    const payloadInfo = decode(signingPayload, {
        metadataRpc,
        registry,
    });
    // console.log(
    //     // TODO all the log messages need to be updated to be relevant to the method used
    //     `\nDecoded Transaction\n  To: ${payloadInfo.method.args.dest}\n` + // To: [object Object]
    //     `  Amount: ${payloadInfo.method.args.value}` // Amount: 20000000000000
    // );

    /*
    // Sign a payload. This operation should be performed on an offline device.
    // const signature = signWith(alice, signingPayload, {
    const signature = signWith(testAcnt2Key, signingPayload, {
        metadataRpc,
        registry,
    });
    console.log(`\nSignature: ${signature}`);
    // Signature: 0x01dedf7b0c18917270030a0af30fc6616b2eb9c2472ed05f4ee7e1d12bc31b8a4586e47ea75849fe5a992da490556c5b7d227804308726d48dd0e90f1cb2aefc8a

    // Encode a signed transaction.
    const tx = construct.signedTx(unsigned, signature, {
        metadataRpc,
        registry,
    });
    console.log(`\nTransaction to Submit: ${tx}`);
    // Transaction to Submit: 0x45028400e24fc1367224c25f0eb4a12d5013386aee19b194dc23b9384b8f975ea7b0610e01dedf7b0c18917270030a0af30fc6616b2eb9c2472ed05f4ee7e1d12bc31b8a4586e47ea75849fe5a992da490556c5b7d227804308726d48dd0e90f1cb2aefc8a15024c001f000000c499d3bbe996dfbb5549064d1890def4a9775a675b43b9203eefd810b21f650b0040e59c3012


    // Calculate the tx hash of the signed transaction offline.
    const expectedTxHash = construct.txHash(tx);
    console.log(`\nExpected Tx Hash: ${expectedTxHash}`);
    // Expected Tx Hash: 0xfdbf723307495148cd36b1f4c5ec2994370ae82900c22cb40956edfc9a593879


    // Send the tx to the node. Since `txwrapper` is offline-only, this
    // operation should be handled externally. Here, we just send a JSONRPC
    // request directly to the node.
    // const actualTxHash = await rpcToLocalNode('author_submitExtrinsic', [tx]);
    // const actualTxHash = await api.rpc.author.submitExtrinsic(tx);
    // console.log(`Actual Tx Hash: ${actualTxHash}`); // 0xfdbf723307495148cd36b1f4c5ec2994370ae82900c22cb40956edfc9a593879
    // // Decode a signed payload.
    // const txInfo = decode(tx, {
    //     metadataRpc,
    //     registry,
    // });
    // console.log(
    //     // TODO all the log messages need to be updated to be relevant to the method used
    //     `\nDecoded Transaction\n  To: ${txInfo.method.args.dest}\n` + // 
    //     `  Amount: ${txInfo.method.args.value}\n`
    // );
    */
}

offlineSignRpcTransfer().catch(console.error).finally(() => process.exit());


export function rpcToLocalNode(
    method: string,
    params: any[] = []
): Promise<any> {
    // return fetch('https://evm.shibuya.astar.network', {
    // return fetch('https://shibuya.public.blastapi.io', { // origin refer
    return fetch('https://hazel-gondolin-982d6.astar.bdnodes.net/para-http-rpc?auth=KpsskkIce4d-ogsKq42cUirhP29tqwW3bOH4sfpPuJ8', {
        body: JSON.stringify({
            id: 1,
            jsonrpc: '2.0',
            method,
            params,
        }),
        headers: {
            'Content-Type': 'application/json',
            connection: 'keep-alive',
        },
        method: 'POST',
    })
        .then((response) => response.json())
        .then(({ error, result }) => {
            if (error) {
                throw new Error(
                    `${error.code} ${error.message}: ${JSON.stringify(error.data)}`
                );
            }

            return result;
        });
}


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