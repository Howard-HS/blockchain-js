const crypto = require('crypto')
const key = 'm^b8@pV!GUjnHHuZsRG2dQKz2h76m4c2eC2Z2K2jqN6e^Wky8eeh8Cpj@vhsj7BB*RTHX!HvPYkqTuYNuGF@yfd@NU9PM%uZ!X@K'

function computeDifficulty() {
  let nounce = 0
  const difficulty = Date.now().toString('8')
  while (true) {
    const hash = crypto.createHash('sha256')
    const answer = hash.update(key + difficulty + nounce).digest('hex')

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
    const answer = hash.update(key + JSON.stringify(data) + nounce).digest('hex')

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
  constructor(data, previousBlock) {
    const result = mine(data)
    this.time = Date.now()
    this.data = data
    this.previousBlock = previousBlock
    this.nextBlock = null
    this.hash = result.answer
    this.nounce = result.nounce
    this.difficulty = result.difficulty
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