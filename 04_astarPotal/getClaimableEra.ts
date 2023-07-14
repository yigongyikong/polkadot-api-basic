import { GeneralStakerInfo, getDappAddressEnum, isValidAddressPolkadotAddress } from "@astar-network/astar-sdk-core";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { Struct, Option, u32 } from "@polkadot/types";
import { AccountId } from "@polkadot/types/interfaces";
import { read } from "fs";
import { BN } from '@polkadot/util';
import { ethers } from "ethers";
import {
    getIndividualClaimTxs,
    PayloadWithWeight,
    ExtrinsicPayload,
} from '@astar-network/astar-sdk-core';



const getClaimableEra = async (/*contractAddresses: string[], walletAddress: string*/) => {
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise({ provider });
    await api.isReady;

    // const dAppCa = '0xa323a643b6ffa64f01100ae34155b27180380d21';
    const dAppCa = '0xc25d089a9b7bfba1cb10b794cd20c66ec1a9c712';
    const waltAddr = 'Y53RfWNhshnPNd6asGBrfAFPwh36fx7jMkFyJMDdZoZ81w1';

    const curEra = await api.query.dappsStaking.currentEra();
    console.log(curEra);
    console.log(curEra.toHuman());
    console.log(Number(curEra));
    
    const txs = await getIndividualClaimTxs({
        dappAddress: dAppCa,
        api,
        senderAddress: waltAddr,
        currentEra: Number(curEra)});
    console.log(txs);
    console.log(txs.length);

}

getClaimableEra().catch(console.error).finally(() => process.exit());