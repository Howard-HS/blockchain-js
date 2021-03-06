const Block = require('./Block')
const Controller = require('./Controller')

const controller = new Controller()

class Blockchain {
  // Initialize a new array of blocks
  constructor (currentTransaction) {
    this.block = []
    this.currentTransaction = currentTransaction || null
  }

  // Check if block array is not empty, if true then get the parentId from previous chain
  // Else the current block is the first block, assign null to parentId
  addBlock (data) {
    // Pass chain to controller to compute current difficulty
    controller.passChain(this.getChain())
    const difficulty = controller.getDifficulty()

    if (this.block.length !== 0) {
      const previousBlock = this.lastBlock().getId()
      const currentBlock = new Block(data, previousBlock)
      this.lastBlock().setNextBlock(currentBlock.getId())
      this.block.push(currentBlock)
    } else {
      this.block.push(new Block(data, null))
    }
  }

  // Get the last block of the block array
  lastBlock () {
    return this.block[this.block.length - 1]
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