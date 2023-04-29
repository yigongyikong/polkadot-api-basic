import { getDappAddressEnum } from "@astar-network/astar-sdk-core";
import { ApiPromise, WsProvider } from "@polkadot/api";


const getUsedFee = async () => {

    // const provider = new WsProvider('wss://rpc.astar.network');
    // const api = new ApiPromise(({ provider }));
    // await api.isReady;

    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise({ provider });
    await api.isReady;
    const testAcnt1 = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U';
    const testAcnt2 = '5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA';
    const dAppCa = '0xc25d089a9b7bfba1cb10b794cd20c66ec1a9c712';
    const amount = 2000000000000000000;

    // const usedFee = await api.query.baseFee.baseFeePerGas();
    // console.log(usedFee.toHuman());
    // console.log('===== ===== =====');
    // const era = await api.query.dappsStaking.currentEra();
    // console.log(era);
    // console.log(era.toHuman());
    // console.log('===== ===== ====='); // generalStakerInfo
    // const usedFee = await api.query.dappsStaking.eraRewardsAndStakes(era);
    const usedFee = await api.query.dappsStaking.contractEraStake(getDappAddressEnum(dAppCa), testAcnt2);
    console.log(usedFee);
    // console.log(usedFee.toHuman());
    console.log('===== ===== =====');
}

getUsedFee().catch(console.error).finally(() => process.exit());