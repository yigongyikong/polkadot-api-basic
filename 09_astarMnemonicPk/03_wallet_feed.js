const ed = require('@noble/ed25519');  // npm install @noble/ed25519@1.7
const Example = async () => {

    // This is the private Ed25519 key we want to import
    // const privateKey = '05260212f2c6e3537c1acb7d03918aba97efe5f3a9130922cd98d901f2d20528';
    // const privateKey = 'b6b3dd3021cffe5fdaaccd9c2fa2543ea97584ad1da01e3bd12fe0656f1bf4b6';
    const privateKey = '06f3dd3021cffe5fdaaccd9c2fa2543ea97584ad1da01e3bd12fe0656f1bf4b6';
    
    
    console.log("private key...............:", privateKey);

    // Hash Ed25519
    const publicKey1 = await ed.getPublicKey(Buffer.from(privateKey, 'hex'));
    console.log("public key (hash ed25519).:", Buffer.from(publicKey1).toString("hex"));

    // To get the "raw" public key xG, from the private key x, using noble, you can do:
    const publicKey2 = ed.Point.BASE.multiply(BigInt("0x" + privateKey));
    console.log("public key (raw)..........:", publicKey2.toHex());

}

Example().catch(console.error).finally(() => process.exit());

// Output:
//private key...............: 05260212f2c6e3537c1acb7d03918aba97efe5f3a9130922cd98d901f2d20528
//public key (hash ed25519).: 81a9c2792564e62bd07d0160720b7af58b78191737aa581cf58054eef7b4a52f
//public key (raw)..........: 00ef13fae121e0a848290f960a2a6dedcc3592060e56d18b7ba3e50ce44cf339




// Enter private key: 05260212f2c6e3537c1acb7d03918aba97efe5f3a9130922cd98d901f2d20528
// Enter public key: 00ef13fae121e0a848290f960a2a6dedcc3592060e56d18b7ba3e50ce44cf339
// 0x05260212f2c6e3537c1acb7d03918aba97efe5f3a9130922cd98d901f2d2052800ef13fae121e0a848290f960a2a6dedcc3592060e56d18b7ba3e50ce44cf339


// mnemonic : move there victory impulse recall never grid unable original pause easy moral
// publicKey : 0xc03aa4a18e9509e2b653bf33a761cb40286de0c3ad3f8ff7042ddd1c99255962
// secretKey : 0xb6b3dd3021cffe5fdaaccd9c2fa2543ea97584ad1da01e3bd12fe0656f1bf4b6  c03aa4a18e9509e2b653bf33a761cb40286de0c3ad3f8ff7042ddd1c99255962