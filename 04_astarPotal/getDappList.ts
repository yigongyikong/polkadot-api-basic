import { getDappAddressEnum } from "@astar-network/astar-sdk-core";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { Struct, Option } from "@polkadot/types";
import { AccountId } from "@polkadot/types/interfaces";


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


export const getDappList = async () => {
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise({ provider });
    await api.isReady;

    // const provider = new WsProvider('wss://rpc.astar.network');
    // const api = new ApiPromise(({ provider }));
    // await api.isReady;

    const dapps = await api.query.dappsStaking.registeredDapps.entries();
    // console.log(dapps.toString());

    const result: SmartContract[] = [];
    dapps.forEach(([key, value]) => {
        const v = <Option<RegisteredDapp>>value;
        // const address = this.getContractAddress(key.args[0] as unknown as SmartContractAddress);
        const address = key.args[0];
        let developer = '';
        let state = SmartContractState.Unregistered;

        if (v.isSome) {
            const unwrappedValue = v.unwrap();
            developer = unwrappedValue.developer.toString();
            state = unwrappedValue.state.isUnregistered
                ? SmartContractState.Unregistered
                : SmartContractState.Registered;
        }

        if (address) {
            const sCclass: SmartContract | never = new SmartContract(address, developer, state);
            // result.push(new SmartContract(address, developer, state));
            result.push(sCclass as never);
        }
    });

    console.log(result);
    console.log('===== ===== =====');
    for (let i = 0; i < result.length; i++) {
        // console.log(result[0]);
        // console.log(result[0]['address']);
        console.log(`${result[i]['address']}`);
        console.log(result[i]['developerAddress']);
        console.log('===== ===== =====');
    }

    // const account = await api.registry.createType('AccountId32', developerAddress.toString());
    // const contractAddress = await api.query.dappsStaking.registeredDevelopers<
    //     Option<SmartContractAddress>
    // >(account);




}



getDappList().catch(console.error).finally(() => process.exit());


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