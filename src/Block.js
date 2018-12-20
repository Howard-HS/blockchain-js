const crypto = require('crypto')

function computeDifficulty() {
  let nounce = 0
  const difficulty = Date.now().toString('8')
  while (true) {
    const hash = crypto.createHash('sha256')
    const answer = hash.update(process.env.HASH_KEY + difficulty + nounce).digest('hex')

    if (answer.startsWith('0000')) {
      return {
        answer,
        difficulty
      }
    }
    nounce++
  }
}

function mine(data) {
  let nounce = 0
  const value = computeDifficulty()
  while (true) {
    const hash = crypto.createHash('sha256')
    const answer = hash.update(process.env.HASH_KEY + JSON.stringify(data) + nounce).digest('hex')

    if (answer < value.answer) {
      return {
        answer,
        nounce,
        difficulty: value.difficulty
      }
    }
    nounce++
  }
}

class Block {
  // Initialize a new block
  constructor(data, previousBlock, difficulty) {
    const result = mine(data)
    this.time = Date.now()
    this.data = data
    this.previousBlock = previousBlock
    this.nextBlock = null
    this.hash = result.answer
    this.nounce = result.nounce
    this.difficulty = difficulty
  }

  // Returns an object containing the block's id information
  getHash() {
    return {
      hash: this.hash,
      previousBlock: this.previousBlock,
      nextBlock: this.nextBlock
    }
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