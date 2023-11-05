import { mnemonicGenerate, cryptoWaitReady, encodeAddress, mnemonicToMiniSecret, randomAsHex, ed25519PairFromSeed } from '@polkadot/util-crypto';
import { Keyring } from '@polkadot/keyring';
import { u8aToHex, stringToU8a, hexToU8a, u8aToString } from '@polkadot/util';

const create = async (limit) => {
    // const keyring = new Keyring({ type: 'sr25519', ss58Format: 5 });
    const keyring = new Keyring({ type: 'ed25519', ss58Format: 5 });

    for (let i = 0; i < limit; i++) {
        // const mnemonic = mnemonicGenerate(); // Creates a valid mnemonic string using using [BIP39]
        // await cryptoWaitReady();

        // const mnemonic = 'weekend drill kick boost armor replace remind surface fashion quality boss okay';
        const mnemonic = 'move there victory impulse recall never grid unable original pause easy moral';

        // const krpair = keyring.addFromMnemonic(mnemonic, { astar: i }, 'sr25519');
        const krpair = keyring.addFromMnemonic(mnemonic, { astar: i }, 'ed25519');
        console.log(`mnemonic : ${mnemonic}`);
        const address = krpair.address;
        console.log(`address : ${address}`);
        // const publicKey = krpair.publicKey;
        // console.log(`publicKey : ${u8aToHex(publicKey)}`);
        const seed = mnemonicToMiniSecret(mnemonic);
        console.log(`seed : ${u8aToHex(seed)}`);

        const edPair = ed25519PairFromSeed(seed);

        console.log(`secretKey : ${u8aToHex(edPair.secretKey)}`);
        console.log(`publicKey : ${u8aToHex(edPair.publicKey)}`);
    }
}

create(1);



// mnemonic : weekend drill kick boost armor replace remind surface fashion quality boss okay
// address : XQ2oeHumUekpDjigPqJ51WnZWS1Fo9UYLEzmxak2mnsjtkn
// seed : 0x3b1d6cec7d96007347bf874ee0bc3c208a56c620bc3f096350e4c4e23af1d406
// secretKey : 0x3b1d6cec7d96007347bf874ee0bc3c208a56c620bc3f096350e4c4e23af1d406  4139bc04770b379d6502eef843b0227ae08d84c31c47b2fea1bf7305483eba20
// publicKey : 0x4139bc04770b379d6502eef843b0227ae08d84c31c47b2fea1bf7305483eba20