import { ApiPromise, WsProvider } from "@polkadot/api";


const getBlockHash = async () => {
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise(({ provider }));
    await api.isReady;

    // returns Hash
    const blockHash = await api.rpc.chain.getBlockHash(3427689);

    console.log(blockHash.toHuman());
}

getBlockHash().catch(console.error).finally(() => process.exit());