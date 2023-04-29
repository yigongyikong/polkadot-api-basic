import { ApiPromise, WsProvider } from "@polkadot/api";


const getBlockLimitTest = async () => {
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise(({
        provider: provider,
    }));
    await api.isReady;

    const blockHash = await api.rpc.chain.getBlockHash(3654722);
    console.log(`blockHash:${blockHash}`);

    // no blockHash is specified, so we retrieve the latest
    const signedBlock = await api.rpc.chain.getBlock(blockHash);
    console.log(`signedBlock:${signedBlock}`);

}

getBlockLimitTest().catch(console.error).finally(() => process.exit());