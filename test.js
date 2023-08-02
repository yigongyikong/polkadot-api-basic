// console.log("before");
// setTimeout(() => console.log("after"), 1000);



function sleep(ms) {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) { }
}

console.log('start')
sleep(3000);
console.log('end')