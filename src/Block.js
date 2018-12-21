const crypto = require('crypto')
const uuid = require("uuid/v4")

function mine(data) {
  let nounce = 0
  const timer = Date.now()
  while (true) {
    const hash = crypto.createHash('sha256')
    const answer = `0x${hash.update(process.env.HASH_KEY + JSON.stringify(data) + nounce).digest('hex')}`

    if (parseInt(answer) < 0x0FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF) {
      return {
        answer,
        nounce,
        elapsed: Date.now() - timer
      }
    }
    nounce++
  }
}

class Block {
  // Initialize a new block
  constructor(data, previousBlock, difficulty) {
    const result = mine(data)
    this.id = uuid()
    this.time = Date.now()
    this.data = data
    this.previousBlock = previousBlock
    this.nextBlock = null
    this.hash = result.answer
    this.nounce = result.nounce
    this.elapsed = result.elapsed
  }

  // Returns an object containing the block's hash information
  getHash() {
    return this.hash
  }

  getId() {
    return this.id
  }

  getComputeTime() {
    return this.elapsed
  }

  // Returns an object containing the block's data information
  getData() {
    return {
      data: this.data
    }
  }

  setNextBlock(nextBlock) {
    this.nextBlock = nextBlock
  }
}

module.exports = Block