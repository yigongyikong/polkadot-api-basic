import { ApiPromise, WsProvider } from "@polkadot/api";
// import { ref, watch, onUnmounted } from 'vue';
// import { $api } from 'boot/api';

export const getEra = async () => {
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise({ provider });
    await api.isReady;

    // const provider = new WsProvider('wss://rpc.astar.network');
    // const api = new ApiPromise(({ provider }));
    // await api.isReady;

    // const era = ref<number>(0);
    // const blockPerEra = ref<number>(0);
    // const blocksUntilNextEra = ref<number>(0);
    // const progress = ref<number>(0);
    // const interval = ref<number>(0);
    // const nextEraStartingBlock = ref<number>(0);

    // let era = 0;
    // let blockPerEra = 0;
    let blocksUntilNextEra  = 0;
    let progress = 0;
    let interval = 0;
    let nextEraStartingBlock = 0;

    // const getEra = async (): Promise<{ era: number; blockPerEra: number } | void> => {
        // const apiRef = $api;
        // if (!apiRef) return;

        const [currentEra, blockAmtPerEra, blockHeight, nextEraStartingBlockHeight] = await Promise.all(
            [
                api.query.dappsStaking.currentEra(),
                api.consts.dappsStaking.blockPerEra,
                api.derive.chain.bestNumber.toString(),
                api.query.dappsStaking.nextEraStartingBlock(),
            ]
        );

        console.log( currentEra, blockAmtPerEra, blockHeight, nextEraStartingBlockHeight );
        console.log('=== === ===');

        const era = Number(currentEra.toString());
        const blockPerEra = Number(blockAmtPerEra.toString());

        const handleBestNumber = blockHeight;
        // await handleBestNumber((bestNumber) => {
        //     const best = bestNumber.toNumber();
        //     // nextEraStartingBlock.value = Number(nextEraStartingBlockHeight.toString());
        //     // const countDown = nextEraStartingBlock.value - best;
        //     nextEraStartingBlock = Number(nextEraStartingBlockHeight.toString());
        //     const countDown = nextEraStartingBlock - best;
        //     const progressRes = ((blockPerEra - countDown) / blockPerEra) * 100;
        //     // progress.value = Number(progressRes.toFixed(0));
        //     // blocksUntilNextEra.value = countDown;
        //     progress = Number(progressRes.toFixed(0));
        //     blocksUntilNextEra = countDown;
        // });



        // return { era, blockPerEra };
        // console.log( era, blockPerEra, progress, blocksUntilNextEra, nextEraStartingBlock );
        console.log( era, blockPerEra, progress, blocksUntilNextEra, Number(nextEraStartingBlockHeight.toHex()) );
    // };

    // const updateEra = async () => {
    //     const data = await getEra();
    //     if (!data) return;
    //     // era.value = Number(data.era.toFixed(0));
    //     // blockPerEra.value = data.blockPerEra;
    //     era = Number(data.era.toFixed(0));
    //     blockPerEra = data.blockPerEra;
    // };

    // const updateIntervalHandler = setInterval(() => {
    //     interval = interval + 1;
    // }, 30000);

    // watch(
    //     [interval],
    //     () => {
    //         const apiRef = $api;
    //         if (!apiRef) return;
    //         apiRef.isReady.then(() => {
    //             try {
    //                 updateEra();
    //             } catch (error) {
    //                 console.error(error);
    //             }
    //         });
    //     },
    //     { immediate: true }
    // );

    // onUnmounted(() => {
    //     clearInterval(updateIntervalHandler);
    // });

    // return {
    //     era,
    //     blockPerEra,
    //     progress,
    //     blocksUntilNextEra,
    //     nextEraStartingBlock,
    // };

    // console.log(
    //     era,
    //     blockPerEra,
    //     progress,
    //     blocksUntilNextEra,
    //     nextEraStartingBlock,
    // );
}

getEra().catch(console.error).finally(() => process.exit());