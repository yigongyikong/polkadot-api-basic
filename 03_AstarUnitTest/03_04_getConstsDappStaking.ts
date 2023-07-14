import { getDappAddressEnum } from "@astar-network/astar-sdk-core";
import { ApiPromise, WsProvider } from "@polkadot/api";


const getConstsDappStaking = async () => {

    // const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    // const api = new ApiPromise({ provider });
    // await api.isReady;

    const provider = new WsProvider('wss://rpc.astar.network');
    const api = new ApiPromise(({ provider }));
    await api.isReady;

    const queryDapp = await api.query.dappsStaking;
    /*{
        palletVersion: [Getter],
        palletDisabled: [Getter],
        ledger: [Getter],
        currentEra: [Getter],
        blockRewardAccumulator: [Getter],
        forceEra: [Getter],
        nextEraStartingBlock: [Getter],
        registeredDevelopers: [Getter],
        registeredDapps: [Getter],
        generalEraInfo: [Getter],
        contractEraStake: [Getter],
        generalStakerInfo: [Getter],
        storageVersion: [Getter]
      }*/
    // console.log(queryDapp);

    // SBY
    // const constsDapp = await api.consts.dappsStaking;
    // console.log(constsDapp);
    // console.log(`blockPerEra : ${constsDapp.blockPerEra}`); // 1200
    // console.log(`maxNumberOfStakersPerContract : ${constsDapp.maxNumberOfStakersPerContract}`); // 2048
    // console.log(`minimumStakingAmount : ${constsDapp.minimumStakingAmount}`); // 5000000000000000000
    // console.log(`minimumRemainingAmount : ${constsDapp.minimumRemainingAmount}`); // 1000000000000000000
    // console.log(`maxUnlockingChunks : ${constsDapp.maxUnlockingChunks}`); // 32
    // console.log(`unbondingPeriod : ${constsDapp.unbondingPeriod}`); // 2
    // console.log(`maxEraStakeValues : ${constsDapp.maxEraStakeValues}`); // 5
    // console.log(`unregisteredDappRewardRetention : ${constsDapp.unregisteredDappRewardRetention}`); // 10
    
    // ASTAR
    const constsDapp = await api.consts.dappsStaking;
    // console.log(constsDapp);
    console.log(`blockPerEra : ${constsDapp.blockPerEra}`); // 7200
    console.log(`maxNumberOfStakersPerContract : ${constsDapp.maxNumberOfStakersPerContract}`); // 16384
    console.log(`minimumStakingAmount : ${constsDapp.minimumStakingAmount}`); // 500000000000000000000
    console.log(`minimumRemainingAmount : ${constsDapp.minimumRemainingAmount}`); // 1000000000000000000
    console.log(`maxUnlockingChunks : ${constsDapp.maxUnlockingChunks}`); // 4
    console.log(`unbondingPeriod : ${constsDapp.unbondingPeriod}`); // 10
    console.log(`maxEraStakeValues : ${constsDapp.maxEraStakeValues}`); // 5
    console.log(`unregisteredDappRewardRetention : ${constsDapp.unregisteredDappRewardRetention}`); // 4294967295
    console.log('===== ===== =====');
}

getConstsDappStaking().catch(console.error).finally(() => process.exit());