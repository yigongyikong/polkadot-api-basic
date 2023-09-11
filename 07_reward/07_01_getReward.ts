const getReward = async () => {
    const response = await fetch("https://astar.api.subscan.io/api/scan/account/reward_slash", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-API-Key": "15fbe4fd75314c32bb23fe18a5ec7cd3",
        },
        body: JSON.stringify({
            "row": 52,
            "address": "a7ZEP29Zk9vrfNWiENXdhLQWxp3yVSvaTBtTcJAkDKHijwX",
            "block_range": "4284091-4284091"
        })
    })

    const jsonData = await response.json();
    // console.log(jsonData);
    let totReward: number = 0;

    jsonData?.data?.list.map((el, idx) => {
        console.log(idx);
        console.log(el.amount);
        let elReward: number = 0;

        elReward = Number(el.amount)
        totReward = addNumber(totReward, elReward);
    })

    console.log(totReward)
}

getReward().catch(console.error).finally(() => process.exit());



function addNumber(x: number, y: number): number {
    return x + y;
}