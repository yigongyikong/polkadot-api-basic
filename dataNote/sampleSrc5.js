async signAsync(account: KeyringPair, options: Partial < SignerOptions >): Promise < SubmittableExtrinsic > {
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
