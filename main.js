const { SHA256 } = require("crypto-js");


class Transactions {
    constructor( fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block{
    constructor( timestamp, transactions, previosHash = ''){
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previosHash = previosHash;
        this.hash = this.caculatehash();
        this.nounce = 0;
    }

    // this will calculate hash for the block
    caculatehash() {
        return SHA256(this.previosHash + this.timestamp + JSON.stringify(this.data ) + this.nounce).toString();
    }

    mineBlock (difficulty) {
        // make hash of block begin with certain amount of zero
        while (this.hash.substring(0, difficulty) !== Array(difficulty+1).join("0")){
            this.nounce++;
            this.hash = this.caculatehash();
            
        }
        console.log("Block mined : "+ this.hash);
    }
}

class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 5;
        this.pendingTransactions = [];
        this.miningReward = 100;

        
    }

    createGenesisBlock () {
        return new Block(0, '20211125', "Gnesis block", "0", )
    }

    getLatestBlock () {
        return this.chain[this.chain.length-1];
    }

    minePendingTransactions(miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);
        console.log('Block successfully mined!!!');
        this.chain.push(block);

        this.pendingTransactions = [
            new Transactions(null, miningRewardAddress, this.miningReward)
        ];
    }

    createTranscation (transaction) {
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress (address) {
        let balacnce = 0;

        for (const block of this.chain) {
            for (const trans of block.transactions){
                if (trans.fromAddress === address){
                    balacnce -= trans.amount;
                }
                if (trans.toAddress === address){
                    balacnce += trans.amount;
                }
            }
        }
        return balacnce;
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

pratikCoin.createTranscation(new Transactions("add1","add2", 100));
pratikCoin.createTranscation(new Transactions("add2","add1", 50));

console.log("Mine Starting...");

pratikCoin.minePendingTransactions('xavier-address');

console.log("balance of xavier is " + pratikCoin.getBalanceOfAddress('xavier-address'));

console.log("starting the mine again...");

pratikCoin.minePendingTransactions('xavier-address');

console.log("balance of xavier is " + pratikCoin.getBalanceOfAddress('xavier-address'));