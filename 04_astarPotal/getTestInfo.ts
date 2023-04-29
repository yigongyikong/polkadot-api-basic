import { GeneralStakerInfo, getDappAddressEnum, isValidAddressPolkadotAddress } from "@astar-network/astar-sdk-core";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { Struct, Option, u32 } from "@polkadot/types";
import { AccountId } from "@polkadot/types/interfaces";
import { read } from "fs";
import { BN } from '@polkadot/util';
import { ethers } from "ethers";



export const getTestInfo = async (/*contractAddresses: string[], walletAddress: string*/) => {
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise({ provider });
    await api.isReady;

    // const provider = new WsProvider('wss://rpc.astar.network');
    // const api = new ApiPromise(({ provider }));
    // await api.isReady;

    const tsBlockTimeAgo = await api.query.timestamp.now();
    // console.log(tsBlockTimeAgo.toHuman());
    // const currentEra = await api.query.dappsStaking.currentEra();
    // console.log(currentEra.toHuman());

    const unbondingPeriod = await api.consts.dappsStaking.unbondingPeriod;
    // console.log(unbondingPeriod.toHuman()); // 2 SBY | 10 ASTAR


    const constDappsStaking = await api.consts.dappsStaking;
    // console.log(constDappsStaking);
    /*
    {
        blockPerEra: [Getter],
            registerDeposit: [Getter],
                maxNumberOfStakersPerContract: [Getter],
                    minimumStakingAmount: [Getter],
                        palletId: [Getter],
                            minimumRemainingAmount: [Getter],
                                maxUnlockingChunks: [Getter],
                                    unbondingPeriod: <BN: a >,
                                        maxEraStakeValues: [Getter],
                                            unregisteredDappRewardRetention: [Getter]
    }
    */
    /*
    const blockPerEra = await api.consts.dappsStaking.blockPerEra;
    console.log(blockPerEra.toHuman()); // 1,200(SBY) | 7,200(ATR)
    const registerDeposit = await api.consts.dappsStaking.registerDeposit;
    console.log(registerDeposit.toHuman()); // 100,000,000,000,000,000,000(SBY) | 1,000,000,000,000,000,000,000(ATR)
    const maxNumberOfStakersPerContract = await api.consts.dappsStaking.maxNumberOfStakersPerContract;
    console.log(maxNumberOfStakersPerContract.toHuman()); // 2,048(SBY) | 16,384(ATR)
    const minimumStakingAmount = await api.consts.dappsStaking.minimumStakingAmount;
    console.log(minimumStakingAmount.toHuman()); // 5,000,000,000,000,000,000(SBY) | 500,000,000,000,000,000,000(ATR)
    const palletId = await api.consts.dappsStaking.palletId;
    console.log(palletId.toHuman()); // py/dpsst(SBY) | py/dpsst(ATR)
    const minimumRemainingAmount = await api.consts.dappsStaking.minimumRemainingAmount;
    console.log(minimumRemainingAmount.toHuman()); // 1,000,000,000,000,000,000(SBY) | 1,000,000,000,000,000,000(ATR)
    const maxUnlockingChunks = await api.consts.dappsStaking.maxUnlockingChunks;
    console.log(maxUnlockingChunks.toHuman()); // 32(SBY) | 4(ATR)
    const unregisteredDappRewardRetention = await api.consts.dappsStaking.unregisteredDappRewardRetention;
    console.log(unregisteredDappRewardRetention.toHuman()); // 10(SBY) | 4,294,967,295(ATR)
    */
    const queryDappsStaking = await api.query.dappsStaking;
    // console.log(queryDappsStaking);
    /*
    {
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
    }
    */
    const queryDappsStakingLedger = await api.query.dappsStaking.ledger;
    // console.log(queryDappsStakingLedger);
    const testacnt1 = 'WytApRyNaNQQZFF8rULKGCSjUkCBM2oAMgtMhpNE3XemDmg';
    const testacnt2 = 'b42omy85WkT84v8xUq2MLmrUj5hVUtJiQFviE4Bda9mjH2V';
    const testacnt3 = 'Y53RfWNhshnPNd6asGBrfAFPwh36fx7jMkFyJMDdZoZ81w1';
    const testacnt4 = 'YevBm73QzETMfh6oWAmC5ckUfxevU39s3hvepxhqpiU5NZG';
    const testacnt5 = 'WcuUpmspMcykJdngmUW9nC4YssuoqvRKnMh69gkmBvFFM95';
    // const test = await (await api.query.dappsStaking.ledger(testacnt2));
    const test1 = await (await api.query.dappsStaking.ledger(testacnt1));
    console.log(test1.toHuman());
    console.log('===== ===== =====');
    const test2 = await (await api.query.dappsStaking.ledger(testacnt2));
    console.log(test2.toHuman());
    console.log('===== ===== =====');
    const test3 = await (await api.query.dappsStaking.ledger(testacnt3));
    console.log(test3.toHuman());
    console.log(test3['unbondingInfo'].toHuman());
    console.log('===== ===== =====');
    const test4 = await (await api.query.dappsStaking.ledger(testacnt4));
    console.log(test4.toHuman());
    console.log(test4['unbondingInfo'].toHuman());
    console.log('===== ===== =====');
    const test5 = await (await api.query.dappsStaking.ledger(testacnt5));
    console.log(test5.toHuman());
    console.log(test5['unbondingInfo'].toHuman());
    console.log('===== ===== =====');
}

getTestInfo().catch(console.error).finally(() => process.exit());