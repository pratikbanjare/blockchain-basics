const { SHA256 } = require("crypto-js");


class Block{
    constructor(index, timestamp, data, previosHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previosHash = previosHash;
        this.hash = '';
    }

    // this will calculate hash for the block
    caculatehash() {
        return SHA256(this.index + this.previosHash + this.timestamp + JSON.stringify(this.data )).toString();
    }
}

class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        
    }

    createGenesisBlock () {
        return new Block(0, '20211125', "Gnesis block", "0", )
    }

    getLatestBlock () {
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock) {
        newBlock.previosHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.caculatehash();
        this.chain.push(newBlock);
    }

    isChainValid () {
        for (let i = 1; i<this.chain.length; ++i){
            const currentBlock = this.chain[i];
            const previosBlock = this.chain[i-1];

            if (currentBlock.hash != currentBlock.caculatehash()){
                return false;
            }
            if (currentBlock.previosHash != previosBlock.hash){
                return false;
            }
        }

        return true;
    }
}

let pratikCoin  = new BlockChain();
pratikCoin.addBlock (new Block(1, "20211126", {amount: 4}) );
pratikCoin.addBlock (new Block(1, "20211127", {amount: 2}) );

console.log(JSON.stringify(pratikCoin, null, 3));

console.log('is chain valid ? ' + pratikCoin.isChainValid());

pratikCoin.chain[1].data = {amount: 100}
pratikCoin.chain[1].hash =  pratikCoin.chain[1].caculatehash();

console.log('is chain valid ? ' + pratikCoin.isChainValid());