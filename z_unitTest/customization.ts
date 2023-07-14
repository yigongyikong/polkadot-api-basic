import { createMetadata, KeyringPair, OptionsWithMeta } from "@substrate/txwrapper-polkadot";
import { EXTRINSIC_VERSION } from '@polkadot/types/extrinsic/v4/Extrinsic';
import { GeneralStakerInfo } from "@astar-network/astar-sdk-core";

const { getDappAddressEnum } = require("@astar-network/astar-sdk-core");

const { ApiTypes, SubmittableExtrinsic } = require("@polkadot/api/types");
const { createPair } = require("@polkadot/keyring");
const { ISubmittableResult } = require("@polkadot/types/types");
const { createClass } = require("@polkadot/api/submittable/createClass");

const {
    construct,
    getRegistry,
    methods,
    deriveAddress,
    decode
} = require('@substrate/txwrapper-polkadot');

const {
    createSigningPayload,
} = require('@substrate/txwrapper-core/lib/core/construct');

const { Keyring } = require('@polkadot/keyring');
const {
    mnemonicGenerate,
    mnemonicToEntropy,
    mnemonicToLegacySeed,
    mnemonicToMiniSecret,
    mnemonicValidate,
    cryptoWaitReady
} = require('@polkadot/util-crypto');
const { stringToU8a, u8aToHex } = require('@polkadot/util');

const { ApiPromise, GenericExtrinsicPayload } = require('@polkadot/api');
const { WsProvider } = require('@polkadot/rpc-provider');
const { createType } = require('@polkadot/types');


const keyring = new Keyring({ type: 'sr25519', ss58Format: 5 });
// Create a new instance of the api
const provider = new WsProvider('wss://rpc.shibuya.astar.network');
const api = new ApiPromise({ provider });

const test_payload = async () => {

    const testMnemonic = 'slice bronze until cabin gold cradle foil carbon measure owner topple dignity';

    await cryptoWaitReady();
    // 'sr25519'
    const testAddFromMnemonic_sr = keyring.addFromMnemonic(testMnemonic, { test: 1 }, 'sr25519');
    console.log(`testAddFromMnemonic_sr-address : ${testAddFromMnemonic_sr.address}`); // b42omy85WkT84v8xUq2MLmrUj5hVUtJiQFviE4Bda9mjH2V | shibuya

    const sampleid = 'VwJHxi1vTNdnJ2KXfQ7tWL8ERiUGv9bwhmf5RDWKGySQmsy';

    await api.isReady;

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
// test_payload().catch(console.error).finally(() => process.exit());


const testOffline = async () => {
    await api.isReady;

    const testAcnt1 = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U';
    const testAcnt2 = '5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA';

    // Retrieve the chain name
    const chain = await api.rpc.system.chain();
    // Retrieve the latest header
    const lastHeader = await api.rpc.chain.getHeader();
    // Log the information
    // console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);

    const blockHash = await api.rpc.chain.getBlockHash(lastHeader.number);
    const metaData = await api.rpc.state.getMetadata(blockHash);

    // console.log(u8aToHex(api.genesisHash)); // The genesisHash of the connected chain

    const accountBalInfo = await api.derive.balances.account(testAcnt2);
    const nonceTestAcnt2 = accountBalInfo.accountNonce.toString();

    // console.log(api.runtimeVersion.specName.toString()); // shibuya | polkadot
    // console.log(api.runtimeVersion.implName.toString()); // shibuya | parity-polkadot
    // console.log(api.runtimeVersion.authoringVersion.toString()); // 1 | 0
    // console.log(api.runtimeVersion.specVersion.toString()); // 92 | 9370
    // console.log(api.runtimeVersion.implVersion.toString()); // 0 | 0
    // console.log(api.runtimeVersion.transactionVersion.toString()); // 2 | 20
    // console.log(api.runtimeVersion.stateVersion.toString()); // 1 | 0
    // console.log(api.runtimeVersion.metadata); // TypeError

    const trsfRawTx = api.tx.balances.transfer(testAcnt1, BigInt(200000000000000000));

    // const unsigned = methods.balances.transfer(
    const unsigned = methods.balances.transferKeepAlive(
        {
            dest: testAcnt1,
            value: '200000000000000000',
        },
        {
            address: testAcnt2,
            blockHash: blockHash,
            blockNumber: lastHeader.number,
            genesisHash: u8aToHex(api.genesisHash),
            metadataRpc: metaData.toHex(),
            nonce: nonceTestAcnt2,
            specVersion: api.runtimeVersion.specVersion.toString(),
            transactionVersion: api.runtimeVersion.transactionVersion.toString()
        },
        {
            metadataRpc: metaData.toHex(),
            registry: trsfRawTx.registry
        },
    );

    // const signingPayload = construct.signingPayload(unsigned, { registry });
    const signingPayload = createSigningPayload(unsigned, trsfRawTx.registry);

    console.log(signingPayload);

}
// testOffline().catch(console.error).finally(() => process.exit());



// = offlineSignRpcTransfer
const mandala = async () => {

    await api.isReady;

    const testAcnt1 = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U';
    const testAcnt2 = '5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA';

    await cryptoWaitReady();

    const keyring = new Keyring({ type: 'sr25519' });
    const testAcnt2Mnemonic = 'slice bronze until cabin gold cradle foil carbon measure owner topple dignity';
    const testAcnt2Key = keyring.addFromUri(testAcnt2Mnemonic);
    console.log(testAcnt2Key.publicKey);
    console.log(u8aToHex(testAcnt2Key.publicKey));
    console.log(deriveAddress(testAcnt2Key.publicKey, 42));
    // console.log(
    //     "testAcnt2Key's SS58-Encoded Address:",
    //     deriveAddress(testAcnt2Key.publicKey, 42) // TODO, use correct prefix
    // );

    const { block } = await rpcToLocalNode('chain_getBlock');
    // console.log(block.header.number);
    // console.log('===== ===== =====');
    const block_api = await api.rpc.chain.getBlock();
    // console.log(block_api);
    // console.log(block_api.block.header.number.toHex());

    const blockHash = await rpcToLocalNode('chain_getBlockHash');
    // console.log(blockHash);
    // console.log('===== ===== =====');
    const blockHash_api = await api.rpc.chain.getBlockHash();
    // console.log(blockHash_api.toHex());
    // console.log('===== ===== =====');
    const genesisHash = await rpcToLocalNode('chain_getBlockHash', [0]);
    // console.log(genesisHash);
    // const genesisHash_api = await api.rpc.chain.getBlockHash();
    const genesisHash_api = await api.genesisHash;
    // console.log(genesisHash_api.toHex());

    const metadataRpc = await rpcToLocalNode('state_getMetadata');
    // console.log(metadataRpc);
    const metadataRpc_api = await api.rpc.state.getMetadata();
    // console.log(metadataRpc_api.toHex());
    // const isSame = (metadataRpc === metadataRpc_api.toHex());
    // console.log(isSame); // true

    const { specVersion, transactionVersion, specName } = await rpcToLocalNode(
        'state_getRuntimeVersion'
    );
    // console.log(specVersion); // 92
    // console.log('===== ===== =====');
    // console.log(transactionVersion); // 2
    // console.log('===== ===== =====');
    // console.log(specName); // shibuya
    // console.log('===== ===== =====');
    const runtime_api = await api.rpc.state.getRuntimeVersion();
    // console.log(runtime_api);
    // console.log('===== ===== =====');
    // console.log(runtime_api.specVersion.toNumber());
    // console.log('===== ===== =====');
    // console.log(runtime_api.transactionVersion.toNumber());
    // console.log('===== ===== =====');
    // console.log(runtime_api.specName.toString());
    // console.log('===== ===== =====');


    const registry = getRegistry({
        chainName: 'shibuya',
        specName,
        specVersion,
        metadataRpc,
    });


    const registry_api = getRegistry({
        chainName: 'shibuya',
        specName: runtime_api.specVersion.toNumber(),
        specVersion: runtime_api.transactionVersion.toNumber(),
        metadataRpc: metadataRpc_api.toHex(),
    });



    const accountBalInfo = await api.derive.balances.account(testAcnt2);
    const nonceTestAcnt2 = accountBalInfo.accountNonce.toString();
    console.log(`nonceTestAcnt2: ${nonceTestAcnt2}`);

    /*const unsigned = methods.balances.transfer(
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
            nonce: nonceTestAcnt2,
            specVersion,
            tip: 0,
            transactionVersion,
        },
        {
            metadataRpc,
            registry,
        }
    );*/


    const unsigned_api = methods.balances.transfer(
        {
            value: '2000000000000000', // 200000000000000000
            dest: testAcnt1, // Bob
        },
        {
            address: deriveAddress(testAcnt2Key.publicKey, 42), // TODO, use correct prefix
            blockHash: blockHash_api.toHex(),
            blockNumber: registry_api
                .createType('BlockNumber', block_api.block.header.number.toHex())
                .toNumber(),
            eraPeriod: 64,
            genesisHash: genesisHash_api.toHex(),
            metadataRpc: metadataRpc_api.toHex(),
            // nonce: 0, // Assuming this is Alice's first tx on the chain
            nonce: nonceTestAcnt2,
            specVersion: runtime_api.specVersion.toNumber(),
            tip: 0,
            transactionVersion: runtime_api.transactionVersion.toNumber(),
        },
        {
            metadataRpc: metadataRpc_api.toHex(),
            registry: registry_api,
        }
    );

    /*
    // Decode an unsigned transaction.
    const decodedUnsigned = decode(unsigned_api, {
        metadataRpc: metadataRpc_api.toHex(),
        registry: registry_api,
    });
    console.log(
        // TODO all the log messages need to be updated to be relevant to the method used
        `\nDecoded Transaction\n  To: ${decodedUnsigned.method.args.dest}\n` +
        `  Amount: ${decodedUnsigned.method.args.value}`
    );


    // Construct the signing payload from an unsigned transaction.
    const signingPayload = construct.signingPayload(unsigned, { registry });
    console.log(`\nPayload to Sign: ${signingPayload}`);

    // Decode the information from a signing payload.
    const payloadInfo = decode(signingPayload, {
        metadataRpc,
        registry,
    });
    console.log(
        // TODO all the log messages need to be updated to be relevant to the method used
        `\nDecoded Transaction\n  To: ${payloadInfo.method.args.dest}\n` +
        `  Amount: ${payloadInfo.method.args.value}`
    );

    // Sign a payload. This operation should be performed on an offline device.
    // const signature = signWith(alice, signingPayload, {
    const signature = signWith(testAcnt2Key, signingPayload, {
        metadataRpc,
        registry,
    });
    console.log(`\nSignature: ${signature}`);

    // Encode a signed transaction.
    const tx = construct.signedTx(unsigned, signature, {
        metadataRpc,
        registry,
    });
    console.log(`\nTransaction to Submit: ${tx}`);


    // Calculate the tx hash of the signed transaction offline.
    const expectedTxHash = construct.txHash(tx);
    console.log(`\nExpected Tx Hash: ${expectedTxHash}`);
    */


    /*
    // Send the tx to the node. Since `txwrapper` is offline-only, this
    // operation should be handled externally. Here, we just send a JSONRPC
    // request directly to the node.
    // const actualTxHash = await rpcToLocalNode('author_submitExtrinsic', [tx]);
    const actualTxHash = await api.rpc.author.submitExtrinsic(tx);
    console.log(`Actual Tx Hash: ${actualTxHash}`);

    // Decode a signed payload.
    const txInfo = decode(tx, {
        metadataRpc,
        registry,
    });
    console.log(
        // TODO all the log messages need to be updated to be relevant to the method used
        `\nDecoded Transaction\n  To: ${txInfo.method.args.dest}\n` +
        `  Amount: ${txInfo.method.args.value}\n`
    );
    */

}
// mandala().catch(console.error).finally(() => process.exit());

// = offlineSignWssTransfer
const cryptoApp = async () => {

    await api.isReady;

    const testAcnt1 = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U';
    const testAcnt2 = '5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA';

    await cryptoWaitReady();

    const keyring = new Keyring({ type: 'sr25519' });
    const testAcnt2Mnemonic = 'slice bronze until cabin gold cradle foil carbon measure owner topple dignity';
    const testAcnt2Key = keyring.addFromUri(testAcnt2Mnemonic);
    // console.log(testAcnt2Key.publicKey);
    // console.log(u8aToHex(testAcnt2Key.publicKey));
    // console.log(deriveAddress(testAcnt2Key.publicKey, 42));
    console.log(
        "testAcnt2Key's SS58-Encoded Address:",
        deriveAddress(testAcnt2Key.publicKey, 42) // TODO, use correct prefix
    );

    // const { block } = await rpcToLocalNode('chain_getBlock');
    // console.log(block.header.number);
    // console.log('===== ===== =====');
    const block_api = await api.rpc.chain.getBlock();
    // console.log(block_api);
    // console.log(block_api.block.header.number.toHex());

    // const blockHash = await rpcToLocalNode('chain_getBlockHash');
    // console.log(blockHash);
    // console.log('===== ===== =====');
    const blockHash_api = await api.rpc.chain.getBlockHash();
    // console.log(blockHash_api.toHex());
    // console.log('===== ===== =====');
    // const genesisHash = await rpcToLocalNode('chain_getBlockHash', [0]);
    // console.log(genesisHash);
    // const genesisHash_api = await api.rpc.chain.getBlockHash();
    const genesisHash_api = await api.genesisHash;
    // console.log(genesisHash_api.toHex());

    // const metadataRpc = await rpcToLocalNode('state_getMetadata');
    // console.log(metadataRpc);
    const metadataRpc_api = await api.rpc.state.getMetadata();
    console.log('===== ===== =====');
    console.log(metadataRpc_api);
    console.log('===== ===== =====');
    console.log(metadataRpc_api.toHex());
    // const isSame = (metadataRpc === metadataRpc_api.toHex());
    // console.log(isSame); // true

    // const { specVersion, transactionVersion, specName } = await rpcToLocalNode(
    //     'state_getRuntimeVersion'
    // );
    // console.log(specVersion); // 92
    // console.log('===== ===== =====');
    // console.log(transactionVersion); // 2
    // console.log('===== ===== =====');
    // console.log(specName); // shibuya
    // console.log('===== ===== =====');
    const runtime_api = await api.rpc.state.getRuntimeVersion();
    // console.log(runtime_api);
    // console.log('===== ===== =====');
    // console.log(runtime_api.specVersion.toNumber());
    // console.log('===== ===== =====');
    // console.log(runtime_api.transactionVersion.toNumber());
    // console.log('===== ===== =====');
    // console.log(runtime_api.specName.toString());
    // console.log('===== ===== =====');


    // const registry = getRegistry({
    //     chainName: 'shibuya',
    //     specName,
    //     specVersion,
    //     metadataRpc,
    // });


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

    // const unsigned = methods.balances.transfer(
    //     {
    //         value: '20000000000000',
    //         dest: testAcnt1, // Bob
    //     },
    //     {
    //         address: deriveAddress(testAcnt2Key.publicKey, 42), // TODO, use correct prefix
    //         blockHash: blockHash,
    //         blockNumber: registry
    //             .createType('BlockNumber', block.header.number)
    //             .toNumber(),
    //         eraPeriod: 64,
    //         // eraPeriod: 128,
    //         genesisHash: genesisHash,
    //         metadataRpc: metadataRpc,
    //         // nonce: 0, // Assuming this is Alice's first tx on the chain
    //         nonce: nonceTestAcnt2,
    //         specVersion: specVersion,
    //         tip: 0,
    //         transactionVersion: transactionVersion,
    //     },
    //     {
    //         metadataRpc: metadataRpc,
    //         registry: registry,
    //     }
    // );
    // console.log(unsigned);
    // console.log('===== ===== =====');


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
            nonce: nonceTestAcnt2,
            specVersion: runtime_api.specVersion.toNumber(),
            tip: 0,
            transactionVersion: runtime_api.transactionVersion.toNumber(),
        },
        {
            metadataRpc: metadataRpc_api.toHex(),
            registry: registry_api,
        }
    );
    console.log(unsigned_api);


    // Decode an unsigned transaction.
    // const decodedUnsigned = decode(unsigned, {
    //     metadataRpc,
    //     registry,
    // });
    // console.log(
    //     // TODO all the log messages need to be updated to be relevant to the method used
    //     `\nDecoded Transaction\n  To: ${decodedUnsigned.method.args.dest}\n` +
    //     `  Amount: ${decodedUnsigned.method.args.value}`
    // );

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
    // const signingPayload = construct.signingPayload(unsigned, { registry });
    // console.log(`\nPayload to Sign: ${signingPayload}`);

    // Construct the signing payload from an unsigned transaction.
    const signingPayload_api = construct.signingPayload(unsigned_api, { registry: registry_api });
    // console.log(`\nPayload to Sign: ${signingPayload_api}`);

    // Decode the information from a signing payload.
    // const payloadInfo = decode(signingPayload, {
    //     metadataRpc,
    //     registry,
    // });
    // console.log(
    //     // TODO all the log messages need to be updated to be relevant to the method used
    //     `\nDecoded Transaction\n  To: ${payloadInfo.method.args.dest}\n` +
    //     `  Amount: ${payloadInfo.method.args.value}`
    // );

    // Decode the information from a signing payload.
    const payloadInfo_api = decode(signingPayload_api, {
        metadataRpc: metadataRpc_api.toHex(),
        registry: registry_api,
    });
    // console.log(
    //     // TODO all the log messages need to be updated to be relevant to the method used
    //     `\nDecoded Transaction\n  To: ${payloadInfo_api.method.args.dest}\n` +
    //     `  Amount: ${payloadInfo_api.method.args.value}`
    // );


    // Sign a payload. This operation should be performed on an offline device.
    // const signature = signWith(alice, signingPayload, {
    // const signature = signWith(testAcnt2Key, signingPayload, {
    //     metadataRpc,
    //     registry,
    // });
    // console.log(`\nSignature: ${signature}`);

    // Encode a signed transaction.
    // const tx = construct.signedTx(unsigned, signature, {
    //     metadataRpc,
    //     registry,
    // });
    // console.log(`\nTransaction to Submit: ${tx}`);


    // Calculate the tx hash of the signed transaction offline.
    // const expectedTxHash = construct.txHash(tx);
    // console.log(`\nExpected Tx Hash: ${expectedTxHash}`);


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
    // const actualTxHash = await api.rpc.author.submitExtrinsic(tx);
    // console.log(`Actual Tx Hash: ${actualTxHash}`);

    // // Decode a signed payload.
    // const txInfo = decode(tx, {
    //     metadataRpc,
    //     registry,
    // });
    // console.log(
    //     // TODO all the log messages need to be updated to be relevant to the method used
    //     `\nDecoded Transaction\n  To: ${txInfo.method.args.dest}\n` +
    //     `  Amount: ${txInfo.method.args.value}\n`
    // );

    /*
    // Send the tx to the node. Since `txwrapper` is offline-only, this
    // operation should be handled externally. Here, we just send a JSONRPC
    // request directly to the node.
    // const actualTxHash = await rpcToLocalNode('author_submitExtrinsic', [tx]);
    const actualTxHash_api = await api.rpc.author.submitExtrinsic(tx_api);
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
    );
    */

}
// cryptoApp().catch(console.error).finally(() => process.exit());

export function rpcToLocalNode(
    method: string,
    params: any[] = []
): Promise<any> {
    return fetch('https://shibuya.public.blastapi.io', {
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

const testStake = async () => {
    await api.isReady;

    const testAcnt1 = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U';
    const testAcnt2 = '5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA';

    await cryptoWaitReady();

    const keyring = new Keyring({ type: 'sr25519' });
    const testAcnt2Mnemonic = 'slice bronze until cabin gold cradle foil carbon measure owner topple dignity'; // pw : testacnt12#$
    const testAcnt2Key = keyring.addFromUri(testAcnt2Mnemonic);
    // console.log(testAcnt2Key.publicKey);
    // console.log(u8aToHex(testAcnt2Key.publicKey));
    // console.log(deriveAddress(testAcnt2Key.publicKey, 42));
    console.log(
        "testAcnt2Key's SS58-Encoded Address:",
        deriveAddress(testAcnt2Key.publicKey, 42) // TODO, use correct prefix
    );

    // const tmp = await api.tx.dappsStaking;
    // console.log(tmp);
    /*{
        register: [Getter],
        unregister: [Getter],
        withdrawFromUnregistered: [Getter],
        bondAndStake: [Getter],
        unbondAndUnstake: [Getter],
        withdrawUnbonded: [Getter],
        nominationTransfer: [Getter],
        claimStaker: [Getter],
        claimDapp: [Getter],
        forceNewEra: [Getter],
        maintenanceMode: [Getter],
        setRewardDestination: [Getter],
        setContractStakeInfo: [Getter],
        burnStaleReward: [Getter]
      }*/
    // const tmp2 = await api.query.dappsStaking;
    // console.log(tmp2);
    /*{
        palletVersion: [Getter],
        palletDisabled: [Getter],
        ledger: [Getter],
        currentEra: [Getter],
        blockRewardAccumulator: [Getter],
        forceEra: [Getter],
        nextEraStartingBlock: [Getter],
        registeredDevelopers: [Getter],
        registeredDapps: [Getter],
        generalEraInfo: [Getter],
        contractEraStake: [Getter],
        generalStakerInfo: [Getter],
        storageVersion: [Getter]
      }*/

    // const bond_and_stake_evm = '0xd1eded053dff25ed48f9c52cee3d6f82f551e142';
    const contractAddress = '0xc25d089a9b7bfba1cb10b794cd20c66ec1a9c712';

    // const tmp3 = await api.tx.dappsStaking.bondAndStake(testAcnt1, 1000000000000000000);
    // console.log(tmp3);

    // const tmp4 = api.consts.dappsStaking.blockPerEra.toString();
    // console.log(tmp4); // 1200

    // const tmp4 = api.consts.dappsStaking.blockPerEra.toString();
    // console.log(tmp4); // 1200

    // const tmp4 = api.consts.dappsStaking.blockPerEra.toString();
    // console.log(tmp4); // 1200

    const amount = await api.consts.dappsStaking.minimumStakingAmount;
    // console.log(amount);
    // console.log(amount.toString()); // 5 00000000 0000000000 minimum 5 SBY
    // minStaking.value = amount.toString();


    // const stakeCall = await api.dappStakingRepository.getBondAndStakeCall(contractAddress, 1000000000000000000);

    // console.log(getDappAddressEnum(contractAddress));

    const stakeCall = await api.tx.dappsStaking.bondAndStake(getDappAddressEnum(contractAddress), BigInt(6000000000000000000));
    console.log(stakeCall); // Submittable { initialU8aLength: undefined, registry: TypeRegistry {} }
    console.log('===== ===== =====');
    console.log(`${stakeCall}`);
    // 1st : {"signature":{"signer":{"id":"VwJHxi1vTNdnJ2KXfQ7tWL8ERiUGv9bwhmf5RDWKGySQmsy"},"signature":{"ed25519":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"},"era":{"immortalEra":"0x00"},"nonce":0,"tip":0},"method":{"callIndex":"0x2203","args":{"contract_id":{"evm":"0xc25d089a9b7bfba1cb10b794cd20c66ec1a9c712"},"value":"0x000000000000000053444835ec580000"}}}
    // 2nd : {"signature":{"signer":{"id":"VwJHxi1vTNdnJ2KXfQ7tWL8ERiUGv9bwhmf5RDWKGySQmsy"},"signature":{"ed25519":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"},"era":{"immortalEra":"0x00"},"nonce":0,"tip":0},"method":{"callIndex":"0x2203","args":{"contract_id":{"evm":"0xc25d089a9b7bfba1cb10b794cd20c66ec1a9c712"},"value":"0x000000000000000053444835ec580000"}}}
    console.log('===== ===== =====');
    const signedTx = await stakeCall.signAsync(testAcnt2Key);
    console.log(signedTx); // Submittable { initialU8aLength: undefined, registry: TypeRegistry {} }
    console.log('===== ===== =====');
    console.log(`${signedTx}`);
    // 2nd : signedTx : {"signature":{"signer":{"id":"b42omy85WkT84v8xUq2MLmrUj5hVUtJiQFviE4Bda9mjH2V"},"signature":{"sr25519":"0xb0f96dd6067ef2d8fd96e765c175da4d0e84a803fd4e8d985190cd2c2da9904b1ea3eb1226801f9ae6078bcee825b39151f94098090d87c27795650e245f0b85"},"era":{"mortalEra":"0xf401"},"nonce":15,"tip":0},"method":{"callIndex":"0x2203","args":{"contract_id":{"evm":"0xc25d089a9b7bfba1cb10b794cd20c66ec1a9c712"},"value":"0x000000000000000053444835ec580000"}}}
    console.log('===== ===== =====');
    // const txhash = await signedTx.send();
    // console.log(txhash);
    // console.log('===== ===== =====');
    // console.log(`txhash : ${txhash}`);

}
// testStake().catch(console.error).finally(() => process.exit());


const offChainStaking = async () => {

    await api.isReady;

    const testAcnt1 = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U';
    const testAcnt2 = '5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA';

    await cryptoWaitReady();

    const keyring = new Keyring({ type: 'sr25519' });
    const testAcnt1Mnemonic = 'accident beauty skill silk sphere gap dutch thank lottery relief vacant ethics';
    const testAcnt1Key = keyring.addFromUri(testAcnt1Mnemonic);
    // console.log(
    //     "testAcnt1Key's SS58-Encoded Address-polkadot(0):",
    //     deriveAddress(testAcnt1Key.publicKey, 0) // TODO, use correct prefix
    // );
    // console.log(
    //     "testAcnt1Key's SS58-Encoded Address-kusama(2):",
    //     deriveAddress(testAcnt1Key.publicKey, 2) // TODO, use correct prefix
    // );
    console.log(
        "testAcnt1Key's SS58-Encoded Address-westend-substrate(42):",
        deriveAddress(testAcnt1Key.publicKey, 42) // TODO, use correct prefix
    );
    // console.log(
    //     "testAcnt1Key's SS58-Encoded Address-?(5):",
    //     deriveAddress(testAcnt1Key.publicKey, 5) // TODO, use correct prefix
    // );
    const testAcnt2Mnemonic = 'slice bronze until cabin gold cradle foil carbon measure owner topple dignity';
    const testAcnt2Key = keyring.addFromUri(testAcnt2Mnemonic);
    // console.log(
    //     "testAcnt2Key's SS58-Encoded Address-polkadot(0):",
    //     deriveAddress(testAcnt2Key.publicKey, 0) // TODO, use correct prefix
    // );
    // console.log(
    //     "testAcnt1Key's SS58-Encoded Address-kusama(2):",
    //     deriveAddress(testAcnt2Key.publicKey, 2) // TODO, use correct prefix
    // );
    console.log(
        "testAcnt2Key's SS58-Encoded Address-westend-substrate(42):",
        deriveAddress(testAcnt2Key.publicKey, 42) // TODO, use correct prefix
    );
    // console.log(
    //     "testAcnt2Key's SS58-Encoded Address-?(5):",
    //     deriveAddress(testAcnt2Key.publicKey, 5) // TODO, use correct prefix
    // );

    const block_api = await api.rpc.chain.getBlock();
    const blockHash_api = await api.rpc.chain.getBlockHash();
    const genesisHash_api = await api.genesisHash;
    const metadataRpc_api = await api.rpc.state.getMetadata();
    const runtime_api = await api.rpc.state.getRuntimeVersion();

    const registry_api = getRegistry({
        chainName: 'shibuya',
        specName: runtime_api.specVersion.toNumber(),
        specVersion: runtime_api.transactionVersion.toNumber(),
        metadataRpc: metadataRpc_api.toHex(),
    });

    const accountBal1Info = await api.derive.balances.account(testAcnt1);
    const nonceTestAcnt1 = accountBal1Info.accountNonce.toString();
    console.log(`nonceTestAcnt1: ${nonceTestAcnt1}`);
    console.log('===== ===== =====');
    const accountBal2Info = await api.derive.balances.account(testAcnt2);
    const nonceTestAcnt2 = accountBal2Info.accountNonce.toString();
    console.log(`nonceTestAcnt2: ${nonceTestAcnt2}`);
    console.log('===== ===== =====');

    const contractAddress = '0xc25d089a9b7bfba1cb10b794cd20c66ec1a9c712';
    const stakeCall = await api.tx.dappsStaking.bondAndStake(getDappAddressEnum(contractAddress), BigInt(6000000000000000000));
    console.log(`${stakeCall.method.toHex()}`);
    console.log('===== ===== =====');

    // const unsigned_api = methods.staking.bondAndStake(getDappAddressEnum(contractAddress), BigInt(6000000000000000000));
    const unsigned_api = methods.balances.transfer(
        {
            value: '200000000000000000', // 200000000000000000
            dest: testAcnt2, // Bob
        },
        {
            // address: deriveAddress(testAcnt2Key.publicKey, 42), // TODO, use correct prefix
            address: testAcnt1, // TODO, use correct prefix
            blockHash: blockHash_api.toHex(),
            blockNumber: registry_api
                .createType('BlockNumber', block_api.block.header.number.toHex())
                .toNumber(),
            eraPeriod: 64,
            genesisHash: genesisHash_api.toHex(),
            metadataRpc: metadataRpc_api.toHex(),
            // nonce: 0, // Assuming this is Alice's first tx on the chain
            nonce: nonceTestAcnt1,
            specVersion: runtime_api.specVersion.toNumber(),
            tip: 0,
            transactionVersion: runtime_api.transactionVersion.toNumber(),
        },
        {
            metadataRpc: metadataRpc_api.toHex(),
            registry: registry_api,
        }
    );
    console.log(unsigned_api);
    console.log('===== ===== =====');
    unsigned_api.method = stakeCall.method.toHex();
    console.log(stakeCall.method.toHex());
    console.log('===== ===== =====');
    console.log(unsigned_api);
    console.log('===== ===== =====');

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
    const signature_api = signWith(testAcnt1Key, signingPayload_api, {
        metadataRpc: metadataRpc_api.toHex(),
        registry: registry_api,
    });
    console.log(`\nSignature: ${signature_api}`);

    // Encode a signed transaction.
    const tx_api = construct.signedTx(unsigned_api, signature_api, {
        metadataRpc: metadataRpc_api.toHex(),
        registry: registry_api,
    });
    console.log(`\nTransaction to Submit: ${tx_api}`);


    // Calculate the tx hash of the signed transaction offline.
    const expectedTxHash_api = construct.txHash(tx_api);
    console.log(`\nExpected Tx Hash: ${expectedTxHash_api}`);


    // Send the tx to the node. Since `txwrapper` is offline-only, this
    // operation should be handled externally. Here, we just send a JSONRPC
    // request directly to the node.
    const actualTxHash = await api.rpc.author.submitExtrinsic(tx_api);
    console.log(`Actual Tx Hash: ${actualTxHash}`);
}
// offChainStaking().catch(console.error).finally(() => process.exit());

const testOffChainStaking = async () => {

    await api.isReady;

    const testAcnt1 = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U';
    const testAcnt2 = '5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA';

    await cryptoWaitReady();

    const keyring = new Keyring({ type: 'sr25519' });
    const testAcnt1Mnemonic = 'accident beauty skill silk sphere gap dutch thank lottery relief vacant ethics';
    const testAcnt1Key = keyring.addFromUri(testAcnt1Mnemonic);
    console.log(
        "testAcnt1Key's SS58-Encoded Address-westend-substrate(42):",
        deriveAddress(testAcnt1Key.publicKey, 42) // TODO, use correct prefix
    );
    const testAcnt2Mnemonic = 'slice bronze until cabin gold cradle foil carbon measure owner topple dignity';
    const testAcnt2Key = keyring.addFromUri(testAcnt2Mnemonic);
    console.log(
        "testAcnt2Key's SS58-Encoded Address-westend-substrate(42):",
        deriveAddress(testAcnt2Key.publicKey, 42) // TODO, use correct prefix
    );

    const block_api = await api.rpc.chain.getBlock();
    const blockHash_api = await api.rpc.chain.getBlockHash();
    const genesisHash_api = await api.genesisHash;
    const metadataRpc_api = await api.rpc.state.getMetadata();
    const runtime_api = await api.rpc.state.getRuntimeVersion();

    const registry_api = getRegistry({
        chainName: 'shibuya',
        specName: runtime_api.specVersion.toNumber(),
        specVersion: runtime_api.transactionVersion.toNumber(),
        metadataRpc: metadataRpc_api.toHex(),
    });

    const accountBal1Info = await api.derive.balances.account(testAcnt1);
    const nonceTestAcnt1 = accountBal1Info.accountNonce.toString();
    console.log(`nonceTestAcnt1: ${nonceTestAcnt1}`);
    console.log('===== ===== =====');
    const accountBal2Info = await api.derive.balances.account(testAcnt2);
    const nonceTestAcnt2 = accountBal2Info.accountNonce.toString();
    console.log(`nonceTestAcnt2: ${nonceTestAcnt2}`);
    console.log('===== ===== =====');

    const contractAddress = '0xc25d089a9b7bfba1cb10b794cd20c66ec1a9c712';
    const stakeCall = await api.tx.dappsStaking.bondAndStake(getDappAddressEnum(contractAddress), BigInt(6000000000000000000));
    console.log(`${stakeCall.method.toHex()}`);
    console.log('===== ===== =====');
    const astarFarmCa = '0x772d8eECb77545Feb8D19F7649F6Be942bFd1cF9';

    // const unsigned_api = methods.staking.bondAndStake(getDappAddressEnum(contractAddress), BigInt(6000000000000000000));
    const unsigned_api = methods.staking.bond(
        {
            value: '6000000000000000000', // 200000000000000000
            controller: astarFarmCa, // Bob
        },
        {
            // address: deriveAddress(testAcnt2Key.publicKey, 42), // TODO, use correct prefix
            address: testAcnt1, // TODO, use correct prefix
            blockHash: blockHash_api.toHex(),
            blockNumber: registry_api
                .createType('BlockNumber', block_api.block.header.number.toHex())
                .toNumber(),
            eraPeriod: 64,
            genesisHash: genesisHash_api.toHex(),
            metadataRpc: metadataRpc_api.toHex(),
            // nonce: 0, // Assuming this is Alice's first tx on the chain
            nonce: nonceTestAcnt1,
            specVersion: runtime_api.specVersion.toNumber(),
            tip: 0,
            transactionVersion: runtime_api.transactionVersion.toNumber(),
        },
        {
            metadataRpc: metadataRpc_api.toHex(),
            registry: registry_api,
        }
    );
    console.log(unsigned_api);
    // console.log('===== ===== =====');
    // unsigned_api.method = stakeCall.method.toHex();
    // console.log(stakeCall.method.toHex());
    // console.log('===== ===== =====');
    // console.log(unsigned_api);
    console.log('===== ===== =====');

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
    const signature_api = signWith(testAcnt1Key, signingPayload_api, {
        metadataRpc: metadataRpc_api.toHex(),
        registry: registry_api,
    });
    console.log(`\nSignature: ${signature_api}`);

    // Encode a signed transaction.
    const tx_api = construct.signedTx(unsigned_api, signature_api, {
        metadataRpc: metadataRpc_api.toHex(),
        registry: registry_api,
    });
    console.log(`\nTransaction to Submit: ${tx_api}`);


    // Calculate the tx hash of the signed transaction offline.
    const expectedTxHash_api = construct.txHash(tx_api);
    console.log(`\nExpected Tx Hash: ${expectedTxHash_api}`);


    // Send the tx to the node. Since `txwrapper` is offline-only, this
    // operation should be handled externally. Here, we just send a JSONRPC
    // request directly to the node.
    // const actualTxHash = await api.rpc.author.submitExtrinsic(tx_api);
    // console.log(`Actual Tx Hash: ${actualTxHash}`);
}
// testOffChainStaking().catch(console.error).finally(() => process.exit());


// needToCheck
const offlineSignTransfer = async () => {
    // Create a new instance of the api
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise({ provider });

    const testAcnt1 = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U';
    const testAcnt2 = '5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA';

    await api.isReady;

    // Retrieve the chain name
    const chain = await api.rpc.system.chain();
    // Retrieve the latest header
    const lastHeader = await api.rpc.chain.getHeader();
    // Log the information
    console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);

    const blockHash = await api.rpc.chain.getBlockHash(lastHeader.number);
    const metaData = await api.rpc.state.getMetadata(blockHash);

    // console.log(u8aToHex(api.genesisHash)); // The genesisHash of the connected chain

    const accountBalInfo = await api.derive.balances.account(testAcnt2);
    const nonceTestAcnt2 = accountBalInfo.accountNonce.toString();

    // console.log(api.runtimeVersion.specName.toString()); // shibuya | polkadot
    // console.log(api.runtimeVersion.implName.toString()); // shibuya | parity-polkadot
    // console.log(api.runtimeVersion.authoringVersion.toString()); // 1 | 0
    // console.log(api.runtimeVersion.specVersion.toString()); // 92 | 9370
    // console.log(api.runtimeVersion.implVersion.toString()); // 0 | 0
    // console.log(api.runtimeVersion.transactionVersion.toString()); // 2 | 20
    // console.log(api.runtimeVersion.stateVersion.toString()); // 1 | 0
    // console.log(api.runtimeVersion.metadata); // TypeError

    const trsfRawTx = api.tx.balances.transfer(testAcnt1, BigInt(200000000000000000));

    const unsigned = methods.balances.transfer(
        {
            dest: testAcnt1,
            value: '200000000000000000',
        },
        {
            address: testAcnt2,
            blockHash: blockHash,
            blockNumber: lastHeader.number,
            genesisHash: u8aToHex(api.genesisHash),
            metadataRpc: metaData.toHex(),
            nonce: nonceTestAcnt2,
            specVersion: api.runtimeVersion.specVersion.toString(),
            transactionVersion: api.runtimeVersion.transactionVersion.toString()
        },
        {
            metadataRpc: metaData.toHex(),
            registry: trsfRawTx.registry
        },
    );

    const signingPayload = createSigningPayload(unsigned, trsfRawTx.registry);

    console.log(signingPayload);
}
// offlineSignTransfer().catch(console.error).finally(() => process.exit());