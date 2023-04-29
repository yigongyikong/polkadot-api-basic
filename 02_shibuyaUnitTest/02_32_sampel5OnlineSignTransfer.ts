import { WsProvider } from '@polkadot/rpc-provider';
import { ApiPromise } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';
import { options } from '@astar-network/astar-api';
import { AddressOrPair, ApiTypes, SignerOptions, SubmittableExtrinsic, SubmittableExtrinsics } from '@polkadot/api-base/types'
import { Address, ApplyExtrinsicResult, CodecHash, EcdsaSignature, Ed25519Signature, Extrinsic, ExtrinsicUnknown, ExtrinsicV4, FunctionMetadataLatest, Hash, RuntimeDispatchInfo, Sr25519Signature } from '@polkadot/types/interfaces';
import { AnyJson, AnyTuple, ArgsDef, CallBase, ExtrinsicPayloadValue, ICompact, IKeyringPair, Inspect, INumber, ISubmittableResult, IU8a, Observable, Registry, SignatureOptions } from '@polkadot/types/types';
import { GenericExtrinsic, GenericExtrinsicEra } from '@polkadot/types';
import { IMethod } from '@polkadot/types-codec/types';

const onlineSignTransfer = async () => {
    // Create a new instance of the api
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise({ provider });

    const testAcnt1 = 'VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U';
    const testAcnt2 = '5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA';

    await api.isReady;

    console.log('===== STEP1-RawTx-Start =====');
    const trsfRawTx = api.tx.balances.transfer(testAcnt1, BigInt(200000000000000000));
    console.log(trsfRawTx);
    // Submittable { initialU8aLength: undefined, registry: TypeRegistry {} }
    console.log('===== ===== =====');
    console.log(`${trsfRawTx}`);
    // {"signature":{"signer":{"id":"VwJHxi1vTNdnJ2KXfQ7tWL8ERiUGv9bwhmf5RDWKGySQmsy"},"signature":{"ed25519":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"},"era":{"immortalEra":"0x00"},"nonce":0,"tip":0},"method":{"callIndex":"0x1f00","args":{"dest":{"id":"VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U"},"value":"0x000000000000000002c68af0bb140000"}}}
    console.log('===== STEP1-RawTx-End =====');

    console.log('===== STEP2-SignRawTx-Start =====');
    const keyring = new Keyring({ type: 'sr25519' });
    const testAcnt2Mnemonic = 'slice bronze until cabin gold cradle foil carbon measure owner topple dignity';
    const testAcnt2Key = keyring.addFromUri(testAcnt2Mnemonic);
    console.log(`testAcnt2Key : ${testAcnt2Key.address}`);
    // testAcnt2Key : 5HBSNV13JH7LuEtJUBNuKgcaPgNaXGBZhCknUWrKmD9p8vhA
    console.log('===== ===== =====');
    // const signedTx = await trsfRawTx.signAsync(testAcnt2Key);

    // Get the extrinsic's payload as a Uint8Array
    const payload = trsfRawTx.registry.createType('ExtrinsicPayload', trsfRawTx.toU8a(false)).toU8a();

    // Use the account keypair's `signPayload` method to sign the payload
    // const signature = await testAcnt2Key.signPayload(payload);
    const signature = await testAcnt2Key.sign(payload);

    // Create a new SubmittableExtrinsic with the signature data added
    // const tx = new SubmittableExtrinsic(this.registry, this.toU8a(true, options), {
    //     signature: signature,
    //     signer: account.publicKey,
    // });

    // const tx = new SubmittableExtrinsic(trsfRawTx.registry, trsfRawTx.toU8a(true), {
    const signedTx = new MyExtrinsic(trsfRawTx.registry, trsfRawTx.toU8a(true), {
        signature: signature,
        signer: testAcnt2Key.publicKey,
    });


    console.log(signedTx);
    // Submittable { initialU8aLength: undefined, registry: TypeRegistry {} }
    console.log('===== ===== =====');
    console.log(`${signedTx}`); // signedTx : {"signature":{"signer":{"id":"b42omy85WkT84v8xUq2MLmrUj5hVUtJiQFviE4Bda9mjH2V"},"signature":{"sr25519":"0x424a05493a61a47b6952b3357bcc08e2d210b566be82ec7fe506840483a9831800c3d355eb4302f676cbeb7d4252602c1d99ddda58e8c292171b72094ed2ac86"},"era":{"mortalEra":"0xe400"},"nonce":6,"tip":0},"method":{"callIndex":"0x1f00","args":{"dest":{"id":"VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U"},"value":"0x000000000000000002c68af0bb140000"}}}
    console.log('===== ===== =====');
    console.log(signedTx.toHex());
    // 0x4d028400e24fc1367224c25f0eb4a12d5013386aee19b194dc23b9384b8f975ea7b0610e010e70f590b3f68abfb91f55515ee62e3a943b397fba1f63cd9748cff1d70b130b67daf97ea6599e555ee2d1402633a9ed095dd5c7897067acafa73354f590a98d84005c001f000000c499d3bbe996dfbb5549064d1890def4a9775a675b43b9203eefd810b21f6513000014bbf08ac602
    console.log('===== ===== =====');
    console.log(`${signedTx.method}`); // {"callIndex":"0x1f00","args":{"dest":{"id":"VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U"},"value":"0x000000000000000002c68af0bb140000"}
    console.log('===== ===== =====');
    console.log(`${signedTx.method.toHex()}`); // 0x1f000000c499d3bbe996dfbb5549064d1890def4a9775a675b43b9203eefd810b21f6513000014bbf08ac602
    console.log('===== STEP2-SignRawTx-End =====');

    console.log('===== STEP3-SendSignedTx-Start =====');
    // const txhash = await signedTx.send();
    // console.log(txhash);
    // console.log('===== ===== =====');
    // console.log(`txhash : ${txhash}`);
    // txhash : 0xc802214877b9efa0cc83e807f079d7cb479d6962642e829e588113e1deda0acb
    // console.log('===== STEP3-SendSignedTx-End =====');
}

onlineSignTransfer().catch(console.error).finally(() => process.exit());