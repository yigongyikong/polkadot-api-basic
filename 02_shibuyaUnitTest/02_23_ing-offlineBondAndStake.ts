import { WsProvider } from '@polkadot/rpc-provider';
import { ApiPromise, Keyring } from '@polkadot/api';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { deriveAddress, getRegistry, methods } from '@substrate/txwrapper-polkadot';
import { getDappAddressEnum } from '@astar-network/astar-sdk-core';

const onlineBondAndStake = async () => {
    // Create a new instance of the api
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise({ provider });

    await api.isReady;

    const testAcnt1 = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U';
    const testAcnt2 = '5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA';

    await cryptoWaitReady();

    const keyring = new Keyring({ type: 'sr25519' });
    const testAcnt2Mnemonic = 'slice bronze until cabin gold cradle foil carbon measure owner topple dignity'; // pw : testacnt12#$
    const testAcnt2Key = keyring.addFromUri(testAcnt2Mnemonic);
    console.log(
        "testAcnt2Key's SS58-Encoded Address:",
        deriveAddress(testAcnt2Key.publicKey, 42) // TODO, use correct prefix
    );

    const contractAddress = '0xc25d089a9b7bfba1cb10b794cd20c66ec1a9c712';

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

    const rewardDestination = 'Staked'; // set the reward destination to Staked
    const unsigned_api = methods.staking.bond(
        {
            controller: testAcnt1,
            stash: testAcnt1,
            value: '5000000000000000000',
            payee: rewardDestination,
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
    console.log(typeof unsigned_api);
    console.log(unsigned_api);
}

onlineBondAndStake().catch(console.error).finally(() => process.exit());