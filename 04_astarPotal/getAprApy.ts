import { ApiPromise, WsProvider } from "@polkadot/api";
import { aprToApy } from "apr-tools";
import { ethers, EtherSymbol } from "ethers";
import { EtherscanPlugin } from "ethers/src.ts/providers";

export const getAprApy = async () => {
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


    const annualRewards = eraRewards * dailyEraRate * 365.25;
    const totalStaked = Number(
        ethers.utils.formatUnits(tvlTokenRef.tvl.toString(), decimalRef)
    );
    const totalStaked = 
    const stakerBlockReward = adjustableStakerPercentage + baseStakerPercent;
    const stakerApr = (annualRewards / totalStaked) * stakerBlockReward * 100;

    // const rlt = aprToApy(49.2);
    // console.log(rlt); // 63.558403160829855
    const rlt = aprToApy(10.9);
    console.log(rlt); // 11.516234758156152


}

getAprApy().catch(console.error).finally(() => process.exit());