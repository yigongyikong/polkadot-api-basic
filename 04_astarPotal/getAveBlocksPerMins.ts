import { ApiPromise, WsProvider } from "@polkadot/api";

const provider = new WsProvider('wss://rpc.shibuya.astar.network');
const api = new ApiPromise({ provider });
await api.isReady;

// const provider = new WsProvider('wss://rpc.astar.network');
// const api = new ApiPromise(({ provider }));
// await api.isReady;

// Memo: get the 7 days average for blocks per minutes
export const getAveBlocksPerMins = async ({
    latestBlock,
    tsNow,
    api,
    blockPerEra,
}: {
    latestBlock: number;
    tsNow: number;
    blockPerEra: number;
    api: ApiPromise;
}): Promise<number> => {
    const block7Eras = blockPerEra * 7;
    const block7EraAgo = latestBlock - block7Eras;
    const hashBlock7ErasAgo = await api.rpc.chain.getBlockHash(block7EraAgo);
    const block = await api.at(hashBlock7ErasAgo);
    const tsBlockTimeAgo = await block.query.timestamp.now();
    // const spentSecs = (tsNow - tsBlockTimeAgo.toNumber()) / 1000;
    const spentSecs = (tsNow - Number(tsBlockTimeAgo)) / 1000;
    const min = 60;
    return min / (spentSecs / (latestBlock - block7EraAgo));
};