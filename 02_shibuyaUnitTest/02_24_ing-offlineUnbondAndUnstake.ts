import { WsProvider } from '@polkadot/rpc-provider';
import { ApiPromise, Keyring } from '@polkadot/api';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { deriveAddress } from '@substrate/txwrapper-polkadot';
import { getDappAddressEnum } from '@astar-network/astar-sdk-core';

const onlineUnbondAndUnstake = async () => {
    // Create a new instance of the api
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise({ provider });

    await api.isReady;

    await cryptoWaitReady();

    const keyring = new Keyring({ type: 'sr25519' });
    const testAcnt2Mnemonic = 'slice bronze until cabin gold cradle foil carbon measure owner topple dignity'; // pw : testacnt12#$
    const testAcnt2Key = keyring.addFromUri(testAcnt2Mnemonic);
    // console.log(testAcnt2Key.publicKey);
    // console.log(u8aToHex(testAcnt2Key.publicKey));
    // console.log(deriveAddress(testAcnt2Key.publicKey, 42));
    console.log(
        "testAcnt2Key's SS58-Encoded Address:",
        deriveAddress(testAcnt2Key.publicKey, 42) // TODO, use correct prefix
    );

    // const tmp4 = api.consts.dappsStaking.blockPerEra.toString();
    // console.log(tmp4); // 1200
    // const amount = await api.consts.dappsStaking.minimumStakingAmount;
    // console.log(amount);
    // console.log(amount.toString()); // 5 00000000 0000000000 minimum 5 SBY
    // minStaking.value = amount.toString();

    const contractAddress = '0xc25d089a9b7bfba1cb10b794cd20c66ec1a9c712';

    // const stakeCall = await api.tx.dappsStaking.bondAndStake(getDappAddressEnum(contractAddress), BigInt(5000000000000000000));
    const stakeCall = await api.tx.dappsStaking.unbondAndUnstake(getDappAddressEnum(contractAddress), BigInt(3000000000000000000));
    console.log(stakeCall); // Submittable { initialU8aLength: undefined, registry: TypeRegistry {} }
    console.log('===== ===== =====');
    console.log(`${stakeCall}`);
    // {"signature":{"signer":{"id":"VwJHxi1vTNdnJ2KXfQ7tWL8ERiUGv9bwhmf5RDWKGySQmsy"},"signature":{"ed25519":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"},"era":{"immortalEra":"0x00"},"nonce":0,"tip":0},"method":{"callIndex":"0x2204","args":{"contract_id":{"evm":"0xc25d089a9b7bfba1cb10b794cd20c66ec1a9c712"},"value":"0x000000000000000029a2241af62c0000"}}}
    console.log('===== ===== =====');
    console.log(`${stakeCall.method}`); // {"callIndex":"0x2204","args":{"contract_id":{"evm":"0xc25d089a9b7bfba1cb10b794cd20c66ec1a9c712"},"value":"0x000000000000000029a2241af62c0000"}}
    console.log('===== ===== =====');

    const signedTx = await stakeCall.signAsync(testAcnt2Key);
    console.log(signedTx); // Submittable { initialU8aLength: undefined, registry: TypeRegistry {} }
    console.log('===== ===== =====');
    console.log(`${signedTx}`);
    // signedTx : {"signature":{"signer":{"id":"b42omy85WkT84v8xUq2MLmrUj5hVUtJiQFviE4Bda9mjH2V"},"signature":{"sr25519":"0xeaa3a3c3d26cc6efcfeaf33d919c98afe4eebe1b74d7e72a89119f03e17e6e01330d3bbb1ad335c3cef00ed897f87ce2395d2682bdcf9f820af7a405e00f6c81"},"era":{"mortalEra":"0xf400"},"nonce":22,"tip":0},"method":{"callIndex":"0x2204","args":{"contract_id":{"evm":"0xc25d089a9b7bfba1cb10b794cd20c66ec1a9c712"},"value":"0x000000000000000029a2241af62c0000"}}}
    console.log('===== ===== =====');
    const txhash = await signedTx.send();
    console.log(`${txhash}`); // 0x828c3f3417235e205516c18f3051ae6d85cc5045a9ac11025399b7b303890a2b
}

onlineUnbondAndUnstake().catch(console.error).finally(() => process.exit());