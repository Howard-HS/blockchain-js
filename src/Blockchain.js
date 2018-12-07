const Block = require('./Block')

class Blockchain {
  // Initialize a new array of blocks
  constructor (currentTransaction) {
    this.block = []
    this.currentTransaction = currentTransaction || null
  }

  // Check if block array is not empty, if true then get the parentId from previous chain
  // Else the current block is the first block, assign null to parentId
  addBlock (data) {
    if (this.block.length !== 0) {
      const previousHash = this.lastBlock().getHash().currentHash
      this.block.push(new Block(data, previousHash))
    } else {
      this.block.push(new Block(data, null))
    }
  }

  // Get the last block of the block array
  lastBlock () {
    return this.block.slice(-1)[0]
  }

  // Get the current block array by index
  // Returns the last block if index is larger than block array
  // Returns the whole array if index is not specified
  getChain (index) {
    if (index) {
      if (index > this.block.length) {
        return this.lastBlock()
      }
      return this.block[index]
    }
    return this.block
  }
}

module.exports = Blockchain