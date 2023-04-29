import { ApiPromise, WsProvider } from "@polkadot/api";

export const getBestNumber = async () => {
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise({ provider });
    await api.isReady;

    // const provider = new WsProvider('wss://rpc.astar.network');
    // const api = new ApiPromise(({ provider }));
    // await api.isReady;

    // const [currentEra, blockAmtPerEra, blockHeight, nextEraStartingBlockHeight] = await Promise.all(
    //     [
    //         api.query.dappsStaking.currentEra(),
    //         api.consts.dappsStaking.blockPerEra,
    //         api.derive.chain.bestNumber.toString(),
    //         api.query.dappsStaking.nextEraStartingBlock(),
    //     ]
    // );

    const bestNumber = await api.derive.chain.bestNumber;
    console.log(bestNumber); // [Function (anonymous)]


}

getBestNumber().catch(console.error).finally(() => process.exit());