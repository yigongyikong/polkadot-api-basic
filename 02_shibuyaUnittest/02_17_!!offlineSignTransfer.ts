import { WsProvider } from '@polkadot/rpc-provider';
import { ApiPromise } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';
import { stringToU8a, u8aToHex } from '@polkadot/util';
import {
    construct,
    getRegistry,
    methods,
    deriveAddress,
    decode
} from '@substrate/txwrapper-polkadot';
import {
    createSigningPayload,
} from '@substrate/txwrapper-core/lib/core/construct';

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

offlineSignTransfer().catch(console.error).finally(() => process.exit());