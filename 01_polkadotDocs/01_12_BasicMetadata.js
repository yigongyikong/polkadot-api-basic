const { ApiPromise } = require('@polkadot/api');
const { WsProvider } = require('@polkadot/rpc-provider');
const { stringToU8a, u8aToHex } = require('@polkadot/util');

// https://polkadot.js.org/docs/api/start/basics
const testBasicsMetadata = async () => {

    // Create a new instance of the api
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise({ provider });


    /**
     * When the API connects to node, one of the first things it does is to retrieve the metadata and decorate the API based on the metadata information.
     * The metadata effectively provides data in the form of api.<type>.<module>.<section> the fits into one of the following categories - 
     * => consts - All runtime constants, e.g. api.consts.balances.existentialDeposit. These are not functions, rather accessing the endpoint immediately yields the result as defined.
     * => query - All chain state, e.g. api.query.system.account(<accountId>).
     * => tx - All extrinsics, e.g. api.tx.balances.transfer(<accountId>, <value>).
     * 
     * Additionally the metadata also provides information on events,
     *  these are query-able via the api.query.system.events() interface and also appear on transactions...
     *  both these cases are detailed later.
     */

    await api.isReady;

    // console.log(api.consts);
    /*{
        system: {
            blockWeights: [Getter],
                blockLength: [Getter],
                    blockHashCount: [Getter],
                        dbWeight: [Getter],
                            version: [Getter],
                                ss58Prefix: [Getter]
        },
        utility: { batchedCallsLimit: [Getter] },
        identity: {
            basicDeposit: [Getter],
                fieldDeposit: [Getter],
                    subAccountDeposit: [Getter],
                        maxSubAccounts: [Getter],
                            maxAdditionalFields: [Getter],
                                maxRegistrars: [Getter]
        },
        timestamp: { minimumPeriod: [Getter] },
        multisig: {
            depositBase: [Getter],
                depositFactor: [Getter],
                    maxSignatories: [Getter]
        },
        ethCall: { callFee: [Getter], callMagicNumber: [Getter] },
        scheduler: { maximumWeight: [Getter], maxScheduledPerBlock: [Getter] },
        proxy: {
            proxyDepositBase: [Getter],
                proxyDepositFactor: [Getter],
                    maxProxies: [Getter],
                        maxPending: [Getter],
                            announcementDepositBase: [Getter],
                                announcementDepositFactor: [Getter]
        },
        transactionPayment: { operationalFeeMultiplier: [Getter] },
        balances: {
            existentialDeposit: [Getter],
                maxLocks: [Getter],
                    maxReserves: [Getter]
        },
        vesting: { minVestedTransfer: [Getter], maxVestingSchedules: [Getter] },
        dappsStaking: {
            blockPerEra: [Getter],
                registerDeposit: [Getter],
                    maxNumberOfStakersPerContract: [Getter],
                        minimumStakingAmount: [Getter],
                            palletId: [Getter],
                                minimumRemainingAmount: [Getter],
                                    maxUnlockingChunks: [Getter],
                                        unbondingPeriod: [Getter],
                                            maxEraStakeValues: [Getter],
                                                unregisteredDappRewardRetention: [Getter]
        },
        blockReward: { rewardAmount: [Getter] },
        assets: {
            removeItemsLimit: [Getter],
                assetDeposit: [Getter],
                    assetAccountDeposit: [Getter],
                        metadataDepositBase: [Getter],
                            metadataDepositPerByte: [Getter],
                                approvalDeposit: [Getter],
                                    stringLimit: [Getter]
        },
        authorship: { uncleGenerations: [Getter] },
        contracts: {
            schedule: [Getter],
                deletionQueueDepth: [Getter],
                    deletionWeightLimit: [Getter],
                        depositPerByte: [Getter],
                            depositPerItem: [Getter],
                                maxCodeLen: [Getter],
                                    maxStorageKeyLen: [Getter],
                                        unsafeUnstableInterface: [Getter],
                                            maxDebugBufferLen: [Getter]
        },
        democracy: {
            enactmentPeriod: [Getter],
                launchPeriod: [Getter],
                    votingPeriod: [Getter],
                        voteLockingPeriod: [Getter],
                            minimumDeposit: [Getter],
                                instantAllowed: [Getter],
                                    fastTrackVotingPeriod: [Getter],
                                        cooloffPeriod: [Getter],
                                            maxVotes: [Getter],
                                                maxProposals: [Getter],
                                                    maxDeposits: [Getter],
                                                        maxBlacklisted: [Getter]
        },
        treasury: {
            proposalBond: [Getter],
                proposalBondMinimum: [Getter],
                    proposalBondMaximum: [Getter],
                        spendPeriod: [Getter],
                            burn: [Getter],
                                palletId: [Getter],
                                    maxApprovals: [Getter]
        }
    }*/

    // console.log(api.query);
    /*{
        substrate: {
            changesTrieConfig: [Getter],
                childStorageKeyPrefix: [Getter],
                    code: [Getter],
                        extrinsicIndex: [Getter],
                            heapPages: [Getter]
        },
        system: {
            palletVersion: [Getter],
                account: [Getter],
                    extrinsicCount: [Getter],
                        blockWeight: [Getter],
                            allExtrinsicsLen: [Getter],
                                blockHash: [Getter],
                                    extrinsicData: [Getter],
                                        number: [Getter],
                                            parentHash: [Getter],
                                                digest: [Getter],
                                                    events: [Getter],
                                                        eventCount: [Getter],
                                                            eventTopics: [Getter],
                                                                lastRuntimeUpgrade: [Getter],
                                                                    upgradedToU32RefCount: [Getter],
                                                                        upgradedToTripleRefCount: [Getter],
                                                                            executionPhase: [Getter]
        },
        identity: {
            palletVersion: [Getter],
                identityOf: [Getter],
                    superOf: [Getter],
                        subsOf: [Getter],
                            registrars: [Getter]
        },
        timestamp: { palletVersion: [Getter], now: [Getter], didUpdate: [Getter] },
        multisig: { palletVersion: [Getter], multisigs: [Getter] },
        randomnessCollectiveFlip: { palletVersion: [Getter], randomMaterial: [Getter] },
        scheduler: {
            palletVersion: [Getter],
                incompleteSince: [Getter],
                    agenda: [Getter],
                        lookup: [Getter]
        },
        proxy: {
            palletVersion: [Getter],
                proxies: [Getter],
                    announcements: [Getter]
        },
        parachainSystem: {
            palletVersion: [Getter],
                pendingValidationCode: [Getter],
                    newValidationCode: [Getter],
                        validationData: [Getter],
                            didSetValidationCode: [Getter],
                                lastRelayChainBlockNumber: [Getter],
                                    upgradeRestrictionSignal: [Getter],
                                        relayStateProof: [Getter],
                                            relevantMessagingState: [Getter],
                                                hostConfiguration: [Getter],
                                                    lastDmqMqcHead: [Getter],
                                                        lastHrmpMqcHeads: [Getter],
                                                            processedDownwardMessages: [Getter],
                                                                hrmpWatermark: [Getter],
                                                                    hrmpOutboundMessages: [Getter],
                                                                        upwardMessages: [Getter],
                                                                            pendingUpwardMessages: [Getter],
                                                                                announcedHrmpMessagesPerCandidate: [Getter],
                                                                                    reservedXcmpWeightOverride: [Getter],
                                                                                        reservedDmpWeightOverride: [Getter],
                                                                                            authorizedUpgrade: [Getter],
                                                                                                customValidationHeadData: [Getter]
        },
        parachainInfo: { palletVersion: [Getter], parachainId: [Getter] },
        transactionPayment: {
            palletVersion: [Getter],
                nextFeeMultiplier: [Getter],
                    storageVersion: [Getter]
        },
        balances: {
            palletVersion: [Getter],
                totalIssuance: [Getter],
                    inactiveIssuance: [Getter],
                        account: [Getter],
                            locks: [Getter],
                                reserves: [Getter]
        },
        vesting: {
            palletVersion: [Getter],
                vesting: [Getter],
                    storageVersion: [Getter]
        },
        dappsStaking: {
            palletVersion: [Getter],
                palletDisabled: [Getter],
                    ledger: [Getter],
                        currentEra: [Getter],
                            blockRewardAccumulator: [Getter],
                                forceEra: [Getter],
                                    nextEraStartingBlock: [Getter],
                                        registeredDevelopers: [Getter],
                                            registeredDapps: [Getter],
                                                generalEraInfo: [Getter],
                                                    contractEraStake: [Getter],
                                                        generalStakerInfo: [Getter],
                                                            storageVersion: [Getter]
        },
        blockReward: {
            palletVersion: [Getter],
                rewardDistributionConfigStorage: [Getter]
        },
        assets: {
            palletVersion: [Getter],
                asset: [Getter],
                    account: [Getter],
                        approvals: [Getter],
                            metadata: [Getter]
        },
        authorship: {
            palletVersion: [Getter],
                uncles: [Getter],
                    author: [Getter],
                        didSetUncles: [Getter]
        },
        collatorSelection: {
            palletVersion: [Getter],
                invulnerables: [Getter],
                    candidates: [Getter],
                        lastAuthoredBlock: [Getter],
                            desiredCandidates: [Getter],
                                candidacyBond: [Getter],
                                    slashDestination: [Getter]
        },
        session: {
            palletVersion: [Getter],
                validators: [Getter],
                    currentIndex: [Getter],
                        queuedChanged: [Getter],
                            queuedKeys: [Getter],
                                disabledValidators: [Getter],
                                    nextKeys: [Getter],
                                        keyOwner: [Getter]
        },
        aura: {
            palletVersion: [Getter],
                authorities: [Getter],
                    currentSlot: [Getter]
        },
        auraExt: { palletVersion: [Getter], authorities: [Getter] },
        xcmpQueue: {
            palletVersion: [Getter],
                inboundXcmpStatus: [Getter],
                    inboundXcmpMessages: [Getter],
                        outboundXcmpStatus: [Getter],
                            outboundXcmpMessages: [Getter],
                                signalMessages: [Getter],
                                    queueConfig: [Getter],
                                        overweight: [Getter],
                                            overweightCount: [Getter],
                                                queueSuspended: [Getter]
        },
        polkadotXcm: {
            palletVersion: [Getter],
                queryCounter: [Getter],
                    queries: [Getter],
                        assetTraps: [Getter],
                            safeXcmVersion: [Getter],
                                supportedVersion: [Getter],
                                    versionNotifiers: [Getter],
                                        versionNotifyTargets: [Getter],
                                            versionDiscoveryQueue: [Getter],
                                                currentMigration: [Getter]
        },
        dmpQueue: {
            palletVersion: [Getter],
                configuration: [Getter],
                    pageIndex: [Getter],
                        pages: [Getter],
                            overweight: [Getter]
        },
        xcAssetConfig: {
            palletVersion: [Getter],
                assetIdToLocation: [Getter],
                    assetLocationToId: [Getter],
                        assetLocationUnitsPerSecond: [Getter]
        },
        evm: {
            palletVersion: [Getter],
                accountCodes: [Getter],
                    accountStorages: [Getter]
        },
        ethereum: {
            palletVersion: [Getter],
                pending: [Getter],
                    currentBlock: [Getter],
                        currentReceipts: [Getter],
                            currentTransactionStatuses: [Getter],
                                blockHash: [Getter]
        },
        baseFee: {
            palletVersion: [Getter],
                baseFeePerGas: [Getter],
                    elasticity: [Getter]
        },
        evmChainId: { palletVersion: [Getter], chainId: [Getter] },
        contracts: {
            palletVersion: [Getter],
                pristineCode: [Getter],
                    codeStorage: [Getter],
                        ownerInfoOf: [Getter],
                            nonce: [Getter],
                                contractInfoOf: [Getter],
                                    deletionQueue: [Getter]
        },
        democracy: {
            palletVersion: [Getter],
                publicPropCount: [Getter],
                    publicProps: [Getter],
                        depositOf: [Getter],
                            referendumCount: [Getter],
                                lowestUnbaked: [Getter],
                                    referendumInfoOf: [Getter],
                                        votingOf: [Getter],
                                            lastTabledWasExternal: [Getter],
                                                nextExternal: [Getter],
                                                    blacklist: [Getter],
                                                        cancellations: [Getter]
        },
        council: {
            palletVersion: [Getter],
                proposals: [Getter],
                    proposalOf: [Getter],
                        voting: [Getter],
                            proposalCount: [Getter],
                                members: [Getter],
                                    prime: [Getter]
        },
        technicalCommittee: {
            palletVersion: [Getter],
                proposals: [Getter],
                    proposalOf: [Getter],
                        voting: [Getter],
                            proposalCount: [Getter],
                                members: [Getter],
                                    prime: [Getter]
        },
        treasury: {
            palletVersion: [Getter],
                proposalCount: [Getter],
                    proposals: [Getter],
                        deactivated: [Getter],
                            approvals: [Getter]
        },
        preimage: {
            palletVersion: [Getter],
                statusFor: [Getter],
                    preimageFor: [Getter]
        },
        sudo: { palletVersion: [Getter], key: [Getter] },
        contractsMigration: { palletVersion: [Getter], migrationStateStorage: [Getter] }
    }*/

    // console.log(api.tx);
    /*[Function(anonymous)] {
        system: [Getter],
            utility: [Getter],
                identity: [Getter],
                    timestamp: [Getter],
                        multisig: [Getter],
                            ethCall: [Getter],
                                scheduler: [Getter],
                                    proxy: [Getter],
                                        parachainSystem: [Getter],
                                            parachainInfo: [Getter],
                                                balances: [Getter],
                                                    vesting: [Getter],
                                                        dappsStaking: [Getter],
                                                            blockReward: [Getter],
                                                                assets: [Getter],
                                                                    authorship: [Getter],
                                                                        collatorSelection: [Getter],
                                                                            session: [Getter],
                                                                                xcmpQueue: [Getter],
                                                                                    polkadotXcm: [Getter],
                                                                                        cumulusXcm: [Getter],
                                                                                            dmpQueue: [Getter],
                                                                                                xcAssetConfig: [Getter],
                                                                                                    evm: [Getter],
                                                                                                        ethereum: [Getter],
                                                                                                            baseFee: [Getter],
                                                                                                                contracts: [Getter],
                                                                                                                    democracy: [Getter],
                                                                                                                        council: [Getter],
                                                                                                                            technicalCommittee: [Getter],
                                                                                                                                treasury: [Getter],
                                                                                                                                    preimage: [Getter],
                                                                                                                                        xvm: [Getter],
                                                                                                                                            sudo: [Getter],
                                                                                                                                                contractsMigration: [Getter]
    }*/

    // console.log(api.genesisHash); // The genesisHash of the connected chain
    /*Type(32) [Uint8Array] [
        221,
        184,
        153,
        115,
        54,
        26,
        23,
        8,
        57,
        248,
        15,
        21,
        45,
        46,
        158,
        56,
        163,
        118,
        165,
        167,
        236,
        206,
        252,
        173,
        231,
        99,
        244,
        106,
        142,
        86,
        112,
        25,
        registry: TypeRegistry {},
        initialU8aLength: 32
      ]*/
    console.log(u8aToHex(api.genesisHash)); // The genesisHash of the connected chain
    // 0xddb89973361a170839f80f152d2e9e38a376a5a7eccefcade763f46a8e567019
    // console.log('===')
    // console.log(api.runtimeMetadata); // The metadata as retrieved from the chain
    /*Metadata(2) [Map] {
        'magicNumber' => <BN: 6174656d>,
        'metadata' => Type { registry: TypeRegistry {}, initialU8aLength: 254685 },
        initialU8aLength: 254689,
        registry: TypeRegistry {}
      }*/
    console.log('===')
    // console.log(api.runtimeVersion); // The chain runtime version (including spec/impl. versions and types)
    /*Type(8) [Map] {
        'specName' => [String (Text): 'shibuya'] {
          registry: TypeRegistry {},
          initialU8aLength: 0
        },
        'implName' => [String (Text): 'shibuya'] {
          registry: TypeRegistry {},
          initialU8aLength: 0
        },
        'authoringVersion' => <BN: 1>,
        'specVersion' => <BN: 5c>,
        'implVersion' => <BN: 0>,
        'apis' => Type(14) [
          Type(2) [
            [Type [Uint8Array]],
            <BN: 4>,
            registry: TypeRegistry {},
            initialU8aLength: 0
          ],
          Type(2) [
            [Type [Uint8Array]],
            <BN: 1>,
            registry: TypeRegistry {},
            initialU8aLength: 0
          ],
          Type(2) [
            [Type [Uint8Array]],
            <BN: 1>,
            registry: TypeRegistry {},
            initialU8aLength: 0
          ],
          Type(2) [
            [Type [Uint8Array]],
            <BN: 6>,
            registry: TypeRegistry {},
            initialU8aLength: 0
          ],
          Type(2) [
            [Type [Uint8Array]],
            <BN: 3>,
            registry: TypeRegistry {},
            initialU8aLength: 0
          ],
          Type(2) [
            [Type [Uint8Array]],
            <BN: 2>,
            registry: TypeRegistry {},
            initialU8aLength: 0
          ],
          Type(2) [
            [Type [Uint8Array]],
            <BN: 1>,
            registry: TypeRegistry {},
            initialU8aLength: 0
          ],
          Type(2) [
            [Type [Uint8Array]],
            <BN: 2>,
            registry: TypeRegistry {},
            initialU8aLength: 0
          ],
          Type(2) [
            [Type [Uint8Array]],
            <BN: 2>,
            registry: TypeRegistry {},
            initialU8aLength: 0
          ],
          Type(2) [
            [Type [Uint8Array]],
            <BN: 1>,
            registry: TypeRegistry {},
            initialU8aLength: 0
          ],
          Type(2) [
            [Type [Uint8Array]],
            <BN: 2>,
            registry: TypeRegistry {},
            initialU8aLength: 0
          ],
          Type(2) [
            [Type [Uint8Array]],
            <BN: 4>,
            registry: TypeRegistry {},
            initialU8aLength: 0
          ],
          Type(2) [
            [Type [Uint8Array]],
            <BN: 2>,
            registry: TypeRegistry {},
            initialU8aLength: 0
          ],
          Type(2) [
            [Type [Uint8Array]],
            <BN: 2>,
            registry: TypeRegistry {},
            initialU8aLength: 0
          ],
          registry: TypeRegistry {},
          initialU8aLength: 0
        ],
        'transactionVersion' => <BN: 2>,
        'stateVersion' => <BN: 1>,
        initialU8aLength: 0,
        registry: TypeRegistry {}
      }*/
    console.log('===')
    console.log(api.runtimeVersion.specName.toString()); // shibuya | polkadot
    console.log(api.runtimeVersion.implName.toString()); // shibuya | parity-polkadot
    console.log(api.runtimeVersion.authoringVersion.toString()); // 1 | 0
    console.log(api.runtimeVersion.specVersion.toString()); // 92 | 9370
    console.log(api.runtimeVersion.implVersion.toString()); // 0 | 0
    console.log(api.runtimeVersion.transactionVersion.toString()); // 2 | 20
    console.log(api.runtimeVersion.stateVersion.toString()); // 1 | 0
    console.log(api.runtimeVersion.metadata); // TypeError

    // await api.isReady;

    // returns Hash
    const blockHash = await api.rpc.chain.getBlockHash();
    // console.log(blockHash);
    console.log(`${blockHash}`); // 0xd41b437c08fb42de5f604f8c1ac5ce2a33503a92abad6337554cd44c48d4483a

    const metaData = await api.rpc.state.getMetadata(blockHash);
    // console.log(metaData);
    // console.log(metaData.toHex());
    /**
     *  'magicNumber' => <BN: 6174656d>,
  'metadata' => Type { registry: TypeRegistry {}, initialU8aLength: 254685 },
     */
    // console.log(`${metaData}`);

    // api.rpc.chain.getBlockHash

    // console.log(api.libraryInfo); // The version of the API, i.e. @polkadot/api v0.90.1
    // @polkadot/api v10.1.4
}
testBasicsMetadata().catch(console.error).finally(() => process.exit());