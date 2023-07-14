import { GeneralStakerInfo, getDappAddressEnum, isValidAddressPolkadotAddress } from "@astar-network/astar-sdk-core";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { Struct, Option, u32 } from "@polkadot/types";
import { AccountId } from "@polkadot/types/interfaces";
import { read } from "fs";
import { BN } from '@polkadot/util';
import { ethers } from "ethers";


const CONTRACT = '0x0000000000000000000000000000000000000001'; //0x01

enum SmartContractState {
    Registered = 'Registered',
    Unregistered = 'Unregistered',
}

interface RegisteredDapp extends Struct {
    readonly developer: AccountId;
    readonly state: DappState;
}

interface DappState {
    isUnregistered: boolean;
    asUnregistered: {
        // Memo: era of unregistration
        words: number[];
    };
}


class SmartContract {
    constructor(
        public address: any,
        public developerAddress: string,
        public state: SmartContractState
    ) { }
}

interface ContractStakeInfo extends Struct {
    total: BN;
    numberOfStakers: u32;
}



export const getDappInfo = async (/*contractAddresses: string[], walletAddress: string*/) => {
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise({ provider });
    await api.isReady;

    // const provider = new WsProvider('wss://rpc.astar.network');
    // const api = new ApiPromise(({ provider }));
    // await api.isReady;

    const currentEra = await api.query.dappsStaking.currentEra();
    console.log(currentEra.toHuman());

    // const eraStakes = await api.queryMulti<Option<ContractStakeInfo>[]>(
    //     contractAddresses.map((address) => {
    //         return [api.query.dappsStaking.contractEraStake, [getDappAddressEnum(address), currentEra]];
    //     })
    // );
    // console.log(eraStakes);
    // console.log('=== === ===')

    const constractAddr = '0xb196bac674bc0e02e78db10e3c015ed4ec802658';

    const rlt = await api.query.dappsStaking.contractEraStake(getDappAddressEnum(constractAddr), currentEra);
    console.log(rlt.toHuman());

    // const stakingAmounts = await Promise.all(
    //     contractAddresses.map(async (address) => {
    //         return {
    //             contractAddress: address,
    //             accountStakingAmount: walletAddress
    //                 ? await fetchAccountStakingAmount(address, walletAddress)
    //                 : '0',
    //         };
    //     })
    // );

    // console.log(stakingAmounts);

    /*return eraStakes.map((x, index) => {
        if (x.isSome) {
            const eraStake = x.unwrap();
            const accountStakingData = stakingAmounts.find(
                (it) => it.contractAddress === contractAddresses[index]
            );
            const accountStakingAmount = accountStakingData
                ? ethers.utils.formatEther(accountStakingData.accountStakingAmount)
                : '0';
            return new StakerInfo(
                contractAddresses[index],
                eraStake.total,
                eraStake.numberOfStakers.toNumber(),
                accountStakingAmount
            );
        } else {
            return new StakerInfo('-', new BN(0), 0, '0');
        }
    });*/


}

// export const fetchAccountStakingAmount = async (contractAddress: string, walletAddress: string): Promise<string> {
//     const provider = new WsProvider('wss://rpc.shibuya.astar.network');
//     const api = new ApiPromise({ provider });
//     await api.isReady;

//     try {
//         if (!isValidAddressPolkadotAddress(walletAddress)) return '0';

//         const stakerInfo = await api.query.dappsStaking.generalStakerInfo<GeneralStakerInfo>(walletAddress, getDappAddressEnum(contractAddress));
//         const balance = stakerInfo.stakes.length && stakerInfo.stakes.slice(-1)[0].staked.toString();
//         return String(balance);
//     } catch (error) {
//         return '0';
//     }
// }

getDappInfo().catch(console.error).finally(() => process.exit());


// DappsStaking.ts
// export class StakerInfo {
//     public totalStakeFormatted?: string;

//     constructor(
//         public contractAddress: string,
//         public totalStake: BN,
//         public stakersCount: number,
//         public accountStakingAmount: string
//     ) { }

//     static createDefault(contractAddress: string): StakerInfo {
//         Guard.ThrowIfUndefined('contractAddress', contractAddress);

//         return new StakerInfo(contractAddress, new BN(0), 0, '0');
//     }
// }