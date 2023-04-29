import { getDappAddressEnum } from "@astar-network/astar-sdk-core";
import { ApiPromise, WsProvider } from "@polkadot/api";


const getQueryContractEraStakeMap = async () => {
  // const provider = new WsProvider('wss://rpc.shibuya.astar.network');
  // const api = new ApiPromise({ provider });
  // await api.isReady;

  const provider = new WsProvider('wss://rpc.astar.network');
  const api = new ApiPromise(({ provider }));
  await api.isReady;


  const DECIMALS = 1_000_000_000_000_000_000;
  const dAppCa = '0xc25d089a9b7bfba1cb10b794cd20c66ec1a9c712';

  const rlt = await api.query.dappsStaking.blockRewardAccumulator()
  console.log(rlt.toHuman());
  // {
  //   stakers: '178,360,327,540,646,851,374,903',
  //   dapps: '52,307,639,721,025,920,000,000'
  // }

}

getQueryContractEraStakeMap().catch(console.error).finally(() => process.exit());