const test = require('ava')
const Blockchain = require('../src/Blockchain')
const blockchain = new Blockchain()

blockchain.addBlock({
  name: 'Howard',
  age: 20
})

blockchain.addBlock({
  name: 'James',
  age: 21
})

blockchain.addBlock({
  name: 'Jenny',
  age: 21
})

blockchain.addBlock({
  name: 'John',
  age: 21
})

test('verifyBlockChain', t => {
  // Loop through the whole block array with map function
  blockchain.getChain().map((block, index, blockchain) => {
    // Get the current block's id information 
    const currentBlock = block.getHash()

    // If the current block's parent id is not null
    if (currentBlock.previousHash !== null) {
      // Get the previous block's information
      const prevBlock = blockchain[index - 1].getHash()

      // Self explanatory
      t.deepEqual(currentBlock.previousHash, prevBlock.hash)
    } else {
      // If parent id is null
      t.deepEqual(currentBlock.previousHash, null)
    }
  })
})
