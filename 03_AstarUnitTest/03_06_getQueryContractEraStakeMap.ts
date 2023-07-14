import { getDappAddressEnum } from "@astar-network/astar-sdk-core";
import { ApiPromise, WsProvider } from "@polkadot/api";


const getQueryContractEraStakeMap = async () => {
  // const provider = new WsProvider('wss://rpc.shibuya.astar.network');
  // const api = new ApiPromise({ provider });
  // await api.isReady;

  const provider = new WsProvider('wss://rpc.astar.network');
  const api = new ApiPromise(({ provider }));
  await api.isReady;

  const contractEraStakeMap = new Map();
  const eraInfoMap = new Map();

  const DECIMALS = 1_000_000_000_000_000_000;
  const dAppCa = '0xc25d089a9b7bfba1cb10b794cd20c66ec1a9c712';

  // fetch all contractEraStake entries for selected contract and convert to map
  // const contractEraStakeEntries = await api.query.dappsStaking.contractEraStake.entries(getDappAddressEnum(dAppCa));
  // contractEraStakeEntries.forEach(([key, points]) => {
  //   // console.log('[key, points] = ', key, points);
  //   const eraKey = parseInt(key.args.map((k) => k.toString())[1]);
  //   // console.log('eraKey', eraKey);
  //   contractEraStakeMap.set(eraKey, points.toJSON());
  //   console.log(`contractEraStakeMap[]`);
  // });
  // console.log(contractEraStakeEntries);

  // fetch all generalEraInfo entries and convert to map
  // const eraInfoEntires =
  //   await api.query.dappsStaking.generalEraInfo.entries();
  // eraInfoEntires.forEach(([key, eraInfo]) => {
  //   const eraKey = parseInt(key.args.map((k) => k.toString())[0]);
  //   console.log('eraInfo', eraInfo.toJSON());
  //   eraInfoMap.set(eraKey, eraInfo.toJSON());
  // });


  // calculate unclaimed eras
  // let unclaimed = 0;
  // contractEraStakeMap.forEach((contractStakeInfo) => {
  //   console.log('contractStakeInfo = ', contractStakeInfo);
  //   if (contractStakeInfo.contractRewardClaimed === false) unclaimed++;
  // });
  // console.log('unclaimed eras', unclaimed);
  // setErasToClaim(unclaimed - 1);


  if (contractEraStakeMap.size !== 0) {
    // First era with staking record
    const firstStaked = Math.min(...contractEraStakeMap.keys());
    // setFirstTimeStaked(firstStaked);
    console.log('firstStakedEra', firstStaked);

    api.query.dappsStaking
      .currentEra((currentEra) => {
        const current = currentEra.toNumber();
        console.log('currentEra', current);
        const entry = contractEraStakeMap.get(current);

        // number of stakers
        const stakerNum = parseInt(entry.numberOfStakers);
        console.log('numberOfStakers', stakerNum);
        // setNumStakers(stakerNum);

        // total staked on the contract
        const total = entry.total / DECIMALS;
        console.log('total', total);
        // setTotalStaked(total);

        // calculate claimed rewards
        let rewarded = 0;
        let unclaimedEra = '';
        for (let era = firstStaked; era <= currentEra; era++) {
          const contractStakeInfo = contractEraStakeMap.get(era);
          const eraInfo = eraInfoMap.get(era);
          if (contractStakeInfo) {
            if (contractStakeInfo.contractRewardClaimed) {
              const ratio = contractStakeInfo.total / eraInfo.staked;
              console.log('ratio', ratio);
              console.log('available ', eraInfo.rewards.dapps / DECIMALS);
              console.log('rewarded ', eraInfo.rewards.dapps * ratio / DECIMALS);
              rewarded += eraInfo.rewards.dapps * ratio;
            } else {
              unclaimedEra += era.toString() + ' ';
            }
            console.log('contractStakeInfo = ', era + ' => ' + (contractStakeInfo.total / DECIMALS) + ' ' + contractStakeInfo.contractRewardClaimed);
            // console.log('contractStakeInfo = ', era + ' => ' + parseInt(contractStakeInfo.total / DECIMALS) + ' ' + contractStakeInfo.contractRewardClaimed);
          } else {
            console.log('selectedContract' + ' missing contractStakeInfo for era', era);
          }
        }
        console.log('claimedRewards', (rewarded / DECIMALS));
        // console.log('claimedRewards', parseInt(rewarded / DECIMALS));
        console.log('unclaimedEra', unclaimedEra);
        // setClaimedRewards(parseInt(rewarded / DECIMALS));
        // setUnclaimedEras(unclaimedEra);
      })
      .catch(console.error);
  }


}

getQueryContractEraStakeMap().catch(console.error).finally(() => process.exit());