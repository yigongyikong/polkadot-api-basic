import { WsProvider } from '@polkadot/rpc-provider';
import { ApiPromise } from '@polkadot/api';


const getAboutEra = async () => {
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise({ provider });

    await api.isReady;

    const curEra = await api.query.dappsStaking.currentEra();
    console.log(curEra.toHuman());
    console.log('===== ===== =====');

    const generalEraInfo = await api.query.dappsStaking.generalEraInfo(curEra);
    console.log(generalEraInfo.toHuman());
    console.log('===== ===== =====');

    const blockPerEra = api.consts.dappsStaking.blockPerEra;
    console.log(blockPerEra.toHuman()); // 1,200
    console.log('===== ===== =====');

    const dappsStaking = await api.query.dappsStaking;
    // console.log(bondAndStake.toHuman()); // 1,200
    console.log('===== ===== =====');
    console.log(dappsStaking); // 1,200
    console.log('===== ===== =====');
}

getAboutEra().catch(console.error).finally(() => process.exit());