const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs');

var resultList = [];
var cnt = 0;

// function delay(ms) {
//     return new Promise(function (resolve, reject) {
//         setTimeout(function () {
//             resolve();
//         }, ms);
//     });
// }

// function getHTML(url) {
//     return new Promise(resolve => {
//         delay(300).then(function () {
//             axios.get(url).then(function (data) {
//                 resolve(data);
//             });
//         });
//     })
// }

function getHTML(url) {
    return new Promise(resolve => {
        (function () {
            axios.get(url).then(function (data) {
                resolve(data);
            });
        });
    })
}

function makeJSON(workList) {
    getHTML(workList[cnt]).then(html => {
        let result = {};
        const $ = cheerio.load(html.data);
        result['title'] = $("body").find(".search_tit").text();
        result['date'] = $("body").find(".tit_loc").text();
        result['content_trans'] = $("body").find(".ins_view_pd").find(".paragraph").eq(0).text();
        result['content_origin'] = $("body").find(".ins_view_pd").find(".paragraph").eq(1).text();
        return result;
    })
        // 추가 작성
        .then(res => {
            cnt++;
            resultList.push(res);
            if (workList.length == cnt) {
                fs.writeFile('result_json.txt', JSON.stringify(resultList), 'utf8', function (error) {
                    console.log('write end');
                });
            } else {
                makeJSON(workList);
            }
            console.log(cnt);
        });
}

function main() {
    fs.readFile('sample.txt', 'utf8', function (err, data) {
        var allText = data;
        var list = allText.split('\n');
        var workList = [];
        for (var i = 1; i < list.length - 1; i++) {
            workList.push(list[i].split('^')[4]);
        }
        makeJSON(workList);
    });
}

main();