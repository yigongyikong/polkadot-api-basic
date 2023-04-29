import { ApiPromise, WsProvider } from "@polkadot/api";
// import { toRefs, reactive, watchEffect } from 'vue';
import { setDefaultUnitName } from '@astar-network/astar-sdk-core';

interface Metadata {
    decimal: number;
    defaultUnitToken: string;
}

export const useChainMetadata = async () => {
    const provider = new WsProvider('wss://rpc.shibuya.astar.network');
    const api = new ApiPromise({ provider });
    await api.isReady;

    // const provider = new WsProvider('wss://rpc.astar.network');
    // const api = new ApiPromise(({ provider }));
    // await api.isReady;

    // const state = reactive<Metadata>({
    //     decimal: 18,
    //     defaultUnitToken: '',
    // });

    const state = {
        decimal: 18,
        defaultUnitToken: '',
    };

    // Memo: Separate the watchEffect due to useApi returns decimal:12 at the very first moment if without `isReady`
    // watchEffect(() => {
    //     if (!$api || !$api) return;

    //     $api.isReady.then(() => {
    //         const registry = $api!.registry;
    //         const decimals = registry.chainDecimals;
    //         state.decimal = (decimals || [])[0];
    //     });
    // });

    const registry = await api.registry;
    const decimals = registry.chainDecimals;
    state.decimal = (decimals || [])[0];

    // watchEffect(() => {
    //     if (!$api || !$api) return;

    //     const tokens = $api!.registry.chainTokens;
    //     // Memo: Always set from blank array if with `isReady`
    //     state.defaultUnitToken = (tokens || [])[0];
    //     setDefaultUnitName(state.defaultUnitToken);
    //     localStorage.setItem(LOCAL_STORAGE.DEFAULT_CURRENCY, state.defaultUnitToken);
    // });

    const tokens = await api.registry.chainTokens;
    // Memo: Always set from blank array if with `isReady`
    state.defaultUnitToken = (tokens || [])[0];
    setDefaultUnitName(state.defaultUnitToken);

    // return toRefs(state);
    // console.log(state);
    return state;
};

// useChainMetadata().catch(console.error).finally(() => process.exit());