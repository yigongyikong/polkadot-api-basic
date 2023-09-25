import { WsProvider, HttpProvider } from '@polkadot/rpc-provider';
import { ApiPromise } from '@polkadot/api';

const getMetaDataRpc = async () => {
    // Create a new instance of the api
    // const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    // const api = new ApiPromise({ provider });

    // await api.isReady;

    const provider = new HttpProvider('https://hazel-gondolin-982d6.astar.bdnodes.net/para-http-rpc?auth=KpsskkIce4d-ogsKq42cUirhP29tqwW3bOH4sfpPuJ8');
    const api = new ApiPromise({ provider });

    await api.isReady;

    // Retrieve the chain name
    const chain = await api.rpc.system.chain();
    // Retrieve the latest header
    const lastHeader = await api.rpc.chain.getHeader();
    // Log the information
    console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);

    const blockHash = await api.rpc.chain.getBlockHash(lastHeader.number);
    const metaData = await api.rpc.state.getMetadata(blockHash);

    console.log(`metaDataRpc : ${metaData.toHex()}`);

    // metadataRpc: metaData.toHex(),
}

getMetaDataRpc().catch(console.error).finally(() => process.exit());