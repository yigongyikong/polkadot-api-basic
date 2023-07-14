import { WsProvider } from '@polkadot/rpc-provider';
import { ApiPromise } from '@polkadot/api';

const getMinimumStakingAmount = async () => {
    // Create a new instance of the api
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise({ provider });

    await api.isReady;

    const amount = await api.consts.dappsStaking.minimumStakingAmount;
    // console.log(amount);
    console.log(amount.toString()); // 5 00000000 0000000000 minimum 5 SBY


}

getMinimumStakingAmount().catch(console.error).finally(() => process.exit());