/**
 * The signAsync method is part of the SubmittableExtrinsic class from the @polkadot/api package in Polkadot.js. It is used to sign an extrinsic (transaction) with the provided account key.
 * Here is a brief explanation of the method:
 */
async signAsync (account: KeyringPair, options: Partial<SignerOptions>): Promise<SubmittableExtrinsic>;

/**
account: The account keypair to sign the extrinsic with.
options: Additional options that can be passed to the signer.
The signAsync method uses the signPayload method from the account keypair object to sign the transaction payload. This method returns a SignatureOptions object containing the signature data, which is then used to create a new SubmittableExtrinsic instance with the signature data added.

Here is a simplified version of the signAsync method:
 */

async signAsync (account: KeyringPair, options: Partial<SignerOptions>): Promise<SubmittableExtrinsic> {
  // Get the extrinsic's payload as a Uint8Array
  const payload = this.registry.createType('ExtrinsicPayload', this.toU8a(false, options)).toU8a();

  // Use the account keypair's `signPayload` method to sign the payload
  const signature = await account.signPayload(payload);

  // Create a new SubmittableExtrinsic with the signature data added
  const tx = new SubmittableExtrinsic(this.registry, this.toU8a(true, options), {
    signature: signature,
    signer: account.publicKey,
  });

  return tx;
}

/**
Note that the actual implementation in the @polkadot/api package may differ from this simplified example.
 */