
import { defaultAmountWithDecimals, fetchRewardsDistributionConfig } from "@astar-network/astar-sdk-core";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { getAveBlocksPerMins } from "../04_astarPotal/getAveBlocksPerMins";
import { useChainMetadata } from "../04_astarPotal/useChainMetadata";
import { ethers } from 'ethers';
import { aprToApy } from 'apr-tools';


const getPendingRewards = async () => {
  const provider = new WsProvider('wss://rpc.shibuya.astar.network');
  const api = new ApiPromise({ provider });
  await api.isReady;

  // const provider = new WsProvider('wss://rpc.astar.network');
  // const api = new ApiPromise(({ provider }));
  // await api.isReady;

  const decimal = await useChainMetadata();
  // console.log(decimal); // { decimal: 18, defaultUnitToken: 'ASTR' }

  // const { blockPerEra } = useCurrentEra();
  // const blocksPerEraRef = Number(blockPerEra.value);
  const blockAmtPerEra = await api.consts.dappsStaking.blockPerEra;
  const blockPerEra = Number(blockAmtPerEra.toString());


  try {
    const results = await Promise.all([
      api.consts.blockReward.rewardAmount.toString(),
      api.query.timestamp.now(),
      api.rpc.chain.getHeader(),
      fetchRewardsDistributionConfig(api),
      api.query.balances.totalIssuance(),
    ]);
    // console.log(results);

    const rewardAmount = await api.consts.blockReward.rewardAmount.toString();
    console.log(rewardAmount);
    console.log('=== === ===');
    const timestamp = await api.query.timestamp.now();
    console.log(timestamp.toHuman());
    console.log('=== === ===');
    const getHeader = await api.rpc.chain.getHeader();
    console.log(getHeader.toHuman());
    console.log('=== === ===');
    const fetchRewardsDistribution = await fetchRewardsDistributionConfig(api);
    console.log(fetchRewardsDistribution);
    console.log('=== === ===');
    const totalIssuance = await api.query.balances.totalIssuance();
    console.log(totalIssuance.toHuman());
    console.log('=== === ===');


/*
    // const rawBlockRewards = results[0];
    const rawBlockRewards = rewardAmount;
    // const blockRewards = Number(defaultAmountWithDecimals(rawBlockRewards, decimalRef));
    const blockRewards = Number(defaultAmountWithDecimals(rawBlockRewards, decimal.decimal));
    // const eraRewards = blocksPerEraRef * blockRewards;
    const eraRewards = blockPerEra * blockRewards;
    // const latestBlock = results[2].toJSON().number as number;
    const latestBlock = getHeader.toJSON().number as number;
    const avrBlockPerMins = await getAveBlocksPerMins({
      // tsNow: results[1].toNumber(),
      tsNow: Number(timestamp),
      latestBlock,
      api: api,
      blockPerEra: blockPerEra,
    });

    const avgBlocksPerDay = avrBlockPerMins * 60 * 24;
    // const dailyEraRate = avgBlocksPerDay / blocksPerEraRef;
    const dailyEraRate = avgBlocksPerDay / blockPerEra;
    const annualRewards = eraRewards * dailyEraRate * 365.25;

    
    const { baseStakerPercent, adjustablePercent, idealDappsStakingTvl } = results[3];
    const totalIssuance = Number(ethers.utils.formatUnits(results[4].toString(), decimalRef));
    const tvlPercentage = totalStaked / totalIssuance;
    const adjustableStakerPercentage =
      Math.min(1, tvlPercentage / idealDappsStakingTvl) * adjustablePercent;
    const stakerBlockReward = adjustableStakerPercentage + baseStakerPercent;
    const stakerApr = (annualRewards / totalStaked) * stakerBlockReward * 100;

    if (stakerApr === Infinity) return 0;
    return stakerApr;
    */
  } catch (error) {
    console.error(error);
    return 0;
  }
}

getPendingRewards().catch(console.error).finally(() => process.exit());