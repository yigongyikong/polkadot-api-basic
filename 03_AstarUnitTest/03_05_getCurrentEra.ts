import { getDappAddressEnum } from "@astar-network/astar-sdk-core";
import { ApiPromise, WsProvider } from "@polkadot/api";


const getCurrentEra = async () => {

  // const provider = new WsProvider('wss://rpc.shibuya.astar.network');
  // const api = new ApiPromise({ provider });
  // await api.isReady;

  const provider = new WsProvider('wss://rpc.astar.network');
  const api = new ApiPromise(({ provider }));
  await api.isReady;

  // shibuya
  const era = await api.query.dappsStaking.currentEra();
  const constsDapp = await (await api.query.dappsStaking.generalEraInfo(era)).toHuman();
  console.log(constsDapp);
  // {
  //   rewards: { stakers: '0', dapps: '0' },
  //   staked: '2,752,893,835,993,918,606,921,590',
  //   locked: '2,766,019,991,332,820,440,833,076'
  // }
  // { // 20230414
  //   rewards: { stakers: '0', dapps: '0' },
  //   staked: '3,145,913,526,731,434,418,014,208,845',
  //   locked: '3,270,418,412,446,351,567,164,988,820'
  // }

  // astar
  // const era = await api.query.dappsStaking.currentEra();
  // const constsDapp = await (await api.query.dappsStaking.generalEraInfo(era)).toHuman();
  // console.log(constsDapp);
  // {
  //   rewards: { stakers: '0', dapps: '0' },
  //   staked: '3,149,605,930,654,674,088,794,719,280',
  //   locked: '3,267,318,398,421,102,702,006,805,546'
  // }
  // const tvl = await constsDapp['staked'];

}

getCurrentEra().catch(console.error).finally(() => process.exit());