// I think I know what causes the problems.
// Many 3rd party libraries do “hashed” Ed25519 as defined in RFC-8032 where the private key is treated as a seed. 
// The seed is hashed into 512 bytes and the first 256 bytes used to form the raw scalar private key x. 
// (The other 256 bytes are used as a prefix to hash together with the message and the public key to get deterministic signing.)
// The TSM instead works with the raw keys directly. 
// So when importing, the TSM expects shares of a raw private key x together with the corresponding raw public key xG.
// If you e.g. use a 3rd party lib like @noble/ed25519, you can get the raw public key xG from the raw private key x:


const ed  = require('@noble/ed25519');  // npm install @noble/ed25519@1.7
const Example = async () => {

	// This is the private Ed25519 key we want to import
	const privateKey = '05260212f2c6e3537c1acb7d03918aba97efe5f3a9130922cd98d901f2d20528';
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


// So in this example, if you want to import the raw private key 05260212f2c6e3537c1acb7d03918aba97efe5f3a9130922cd98d901f2d20528
// into the TSM, then you should provide to the TSM the raw public key 00ef13fae… and not the public key 81a9c….
// Can you try to test if you can get key import to work using raw public keys as generated in the example above?
// If the original private keys you want to import, are seeds according to the “hash Ed25519” and not raw private key scalars, 
// you need to  convert the seeds to raw private key scalars as explained in section 5.1.5 here, 
// before you secret share and import it into the TSM. Let us know if that is the case, then we can help you along.


// 0x3b1d6cec7d96007347bf874ee0bc3c208a56c620bc3f096350e4c4e23af1d406
// 0x001d6cec7d96007347bf874ee0bc3c208a56c620bc3f096350e4c4e23af1d406



lNBDPNIccp7asscdbBocAbsecENF