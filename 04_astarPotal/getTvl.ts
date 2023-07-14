import { ApiPromise, WsProvider } from "@polkadot/api";

export const getTvl = async () => {
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

    const tvl = await api.derive.chain.bestNumber;
    console.log(bestNumber);


}

getTvl().catch(console.error).finally(() => process.exit());