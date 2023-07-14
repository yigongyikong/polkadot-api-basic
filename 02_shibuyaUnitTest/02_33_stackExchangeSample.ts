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
import { getDappAddressEnum } from '@astar-network/astar-sdk-core';

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
    console.log(block_api.block.header.number.toHex()); // 0x00362c5d
    console.log('===== ===== =====');
    console.log(block_api.block.header.number); // Type { registry: TypeRegistry {}, initialU8aLength: 0 }
    console.log('===== ===== =====');
    console.log(block_api.block.header.number.toNumber()); // 3550301
    console.log('===== ===== =====');
    const blockHash_api = await api.rpc.chain.getBlockHash(block_api.block.header.number.toHex());
    console.log(blockHash_api.toHex());
    console.log('===== ===== =====');
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
    console.log(`nonceTestAcnt2: ${nonceTestAcnt2}`);
    console.log('===== ===== =====');

    const blockNumber_tmp = registry_api.createType('BlockNumber', block_api.block.header.number.toHex()).toNumber();
    console.log(blockNumber_tmp); // 3550336
    console.log('===== ===== =====');

    const era_tmp = api.registry.createType('ExtrinsicEra', {
        current: blockNumber_tmp,
        period: 64,
    });
    console.log(era_tmp); // Type { registry: TypeRegistry {} }
    console.log('===== ===== =====');
    console.log(era_tmp.toHuman());
    console.log('===== ===== =====');
    console.log(era_tmp.toHex());
    console.log('===== ===== =====');

    const contractAddress = '0xc25d089a9b7bfba1cb10b794cd20c66ec1a9c712';

    // const stakeCall = await api.tx.dappsStaking.bondAndStake(getDappAddressEnum(contractAddress), BigInt(5000000000000000000));
    // const stakeCall = await api.tx.dappsStaking.unbondAndUnstake(getDappAddressEnum(contractAddress), BigInt(3000000000000000000));

    const unsigned_api = {
        // specVersion: specVersion,
        // transactionVersion: transactionVersion,
        // address: address,
        // blockHash: blockHash,
        // blockNumber: registry_api
        //     .createType('BlockNumber', block_api.block.header.number.toHex())
        //     .toNumber(),
        // era: api.registry.createType('ExtrinsicEra', {
        //     current: blockNumber,
        //     period: 64,
        // }),
        // nonce: accountNonce,

        specVersion: runtime_api.specVersion.toNumber(),
        transactionVersion: runtime_api.transactionVersion.toNumber(),
        address: testAcnt2,
        blockHash: blockHash_api.toHex(),
        blockNumber: blockNumber_tmp,
        era: era_tmp,
        genesisHash: genesisHash_api.toHex(),
        method: api.tx.balances.transfer(testAcnt1, BigInt(200000000000000000)).method.toHex(),
        // method: api.tx.dappsStaking.unbondAndUnstake(getDappAddressEnum(contractAddress), BigInt(3000000000000000000)).method.toHex(),
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
    }
    console.log(typeof unsigned_api);
    console.log('===== ===== =====');
    console.log(unsigned_api);
    console.log('===== ===== =====');
    console.log('===== ===== =====');
    console.log('===== ===== =====');


    // create an extrinsic payload to sign and get the signature
    // const extrinsicPayload = this.registry.createType('ExtrinsicPayload', unsigned_api, {
    const extrinsicPayload = api.registry.createType('ExtrinsicPayload', unsigned_api, {
        version: unsigned_api.version
    });
    console.log(extrinsicPayload);
    console.log('===== ===== =====');
    console.log(`${extrinsicPayload}`);
    console.log('===== ===== =====');
    console.log(extrinsicPayload.toHex());
    console.log('===== ===== =====');
    console.log(extrinsicPayload.toHuman());
    console.log('===== ===== =====');

    // get signature by passing your account keypair to the sign method on the extrinsic payload
    // const signature = extrinsicPayload.sign(keypair);
    const signature = extrinsicPayload.sign(testAcnt2Key);
    console.log(signature);
    console.log('===== ===== =====');
    /*{
        signature: '0x0134a322a0cfc8c49c84652904587c2a40424f0c681caf8063bf90311a0f39b456d572c310b71f39d18ccb8ccc6d4a4496b6e949ede39f69281d72e8bd8c7f7d8f'
    }*/

    // create extrinsic from the unsigned payload
    // const extrinsic = registry.createType(
    //     'Extrinsic',
    //     { method: unsigned.method },
    //     { version: unsigned.version }
    // );
    const extrinsic = api.registry.createType(
        'Extrinsic',
        { method: unsigned_api.method },
        { version: unsigned_api.version }
    );
    console.log(extrinsic); // Type { initialU8aLength: undefined, registry: TypeRegistry {} }
    console.log('===== ===== =====');
    console.log(`${extrinsic}`); // {"signature":{"signer":{"id":"VwJHxi1vTNdnJ2KXfQ7tWL8ERiUGv9bwhmf5RDWKGySQmsy"},"signature":{"ed25519":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"},"era":{"immortalEra":"0x00"},"nonce":0,"tip":0},"method":{"callIndex":"0x2204","args":{"contract_id":{"evm":"0xc25d089a9b7bfba1cb10b794cd20c66ec1a9c712"},"value":"0x000000000000000029a2241af62c0000"}}}
    console.log('===== ===== =====');
    console.log(extrinsic.toHex()); // 0x8404220400c25d089a9b7bfba1cb10b794cd20c66ec1a9c7121300002cf61a24a229
    console.log('===== ===== =====');
    console.log(extrinsic.toHuman());
    console.log('===== ===== =====');
    /*{
        isSigned: false,
            method: {
            args: { contract_id: [Object], value: '3,000,000,000,000,000,000' },
            method: 'unbondAndUnstake',
                section: 'dappsStaking'
        }
    }*/

    // with the received signature from the sign method on the ExtrinsicPayload,
    // extrinsic.addSignature(unsigned.address, signature, unsigned);
    extrinsic.addSignature(unsigned_api.address, signature.signature, unsigned_api);

    // save the hex of the signed extrinsic to later send to the public node
    const hex = extrinsic.toHex();
    console.log(hex); // 0x1d028400e24fc1367224c25f0eb4a12d5013386aee19b194dc23b9384b8f975ea7b0610e0134a322a0cfc8c49c84652904587c2a40424f0c681caf8063bf90311a0f39b456d572c310b71f39d18ccb8ccc6d4a4496b6e949ede39f69281d72e8bd8c7f7d8f85006800220400c25d089a9b7bfba1cb10b794cd20c66ec1a9c7121300002cf61a24a229
    console.log('===== ===== =====');

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





    // api!.tx.dappsStaking.setRewardDestination(rewardDestination);

    // const payload = $api?.tx.dappsStaking
    // .register(developerAddress, getDappAddressEnum(contractAddress))

    // const transaction = $api!.tx.dappsStaking.withdrawUnbonded();

    // context.api.tx.dappsStaking.register(getAddressEnum(CONTRACT)),