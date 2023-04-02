let str = '{"signature":{"signer":{"id":"VwJHxi1vTNdnJ2KXfQ7tWL8ERiUGv9bwhmf5RDWKGySQmsy"},"signature":{"ed25519":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"},"era":{"immortalEra":"0x00"},"nonce":0,"tip":0},"method":{"callIndex":"0x1f00","args":{"dest":{"id":"VxJhKGJ7wsVwZvaikWQzhexb9VawgFUtBuXNAmDAhBBVi4U"},"value":"0x000000000000000002c68af0bb140000"}}}';
console.log(str);

const jsonstr = JSON.parse(str);
console.log(jsonstr);
console.log(jsonstr.method.args.dest);

let tmpHex = '0xb4041f000000c499d3bbe996dfbb5549064d1890def4a9775a675b43b9203eefd810b21f6513000014bbf08ac602';
