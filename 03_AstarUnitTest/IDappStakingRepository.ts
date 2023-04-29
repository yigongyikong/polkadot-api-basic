import { BN } from '@polkadot/util';
import { ISubmittableResult } from '@polkadot/types/types';
import type { SubmittableExtrinsic } from '@polkadot/api/types';
import { u32 } from '@polkadot/types';
import { GeneralStakerInfo } from '@astar-network/astar-sdk-core';

/**
 * Definition of repository to access dapps staking pallet.
 */
export interface IDappStakingRepository {
    /**
     * Gets Total Value Locked (TVL) value.
     */
    getTvl(): Promise<BN>;

    /**
     * Gets bondAndStake call extrisnic.
     */
    getBondAndStakeCall(
        contractAddress: string,
        amount: BN
    ): Promise<SubmittableExtrinsic<'promise', ISubmittableResult>>;

    /**
     * Gets unbondAndUnstale call extrinsic.
     */
    getUnbondAndUnstakeCall(
        contractAddress: string,
        amount: BN
    ): Promise<SubmittableExtrinsic<'promise', ISubmittableResult>>;

    /**
     * Gets nomination transfer call
     */
    getNominationTransferCall({
        amount,
        fromContractId,
        targetContractId,
    }: {
        amount: BN;
        fromContractId: string;
        targetContractId: string;
    }): Promise<SubmittableExtrinsic<'promise', ISubmittableResult>>;

    /**
     * Starts subscription to a era change.
     */
    starEraSubscription(): Promise<void>;

    fetchAccountStakingAmount(contractAddress: string, walletAddress: string): Promise<string>;

    /** Gets contract address registered by the given developer address */
    getRegisteredContract(developerAddress: string): Promise<string | undefined>;

    /**
     * Gets dapp staking APR and APY values for a given network.
     * @param network Network to fetch values for.
     */
    getApr(network: string): Promise<{ apr: number; apy: number }>;

    getCurrentEra(): Promise<u32>;

    getGeneralStakerInfo(
        stakerAddress: string,
        contractAddress: string
    ): Promise<Map<string, GeneralStakerInfo>>;

    getNextEraEta(network: string): Promise<number>;
}