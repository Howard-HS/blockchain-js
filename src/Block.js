const crypto = require('crypto')
const key = 'm^b8@pV!GUjnHHuZsRG2dQKz2h76m4c2eC2Z2K2jqN6e^Wky8eeh8Cpj@vhsj7BB*RTHX!HvPYkqTuYNuGF@yfd@NU9PM%uZ!X@K'

function mine (data) {
  let nounce = 0
  while (true) {
    const hash = crypto.createHash('sha256')
    const answer = hash.update(key + JSON.stringify(data) + nounce).digest('hex')
    
    if (answer.startsWith('0000')) {
      return { answer, nounce }
    }
    nounce++
  }
}

class Block {
  // Initialize a new block
  constructor (data, previousHash) {
    const hash = crypto.createHash('sha256')
    const result = mine(data)
    this.data = data
    this.previousHash = previousHash
    this.hash = hash.update(result.answer).digest('hex')
    this.nounce = result.nounce
  }

  // Returns an object containing the block's id information
  getHash () {
    return {
      currentHash: this.hash,
      previousHash: this.previousHash
    }
  }

  // Returns an object containing the block's data information
  getData () {
    return {
      data: this.data
    }
  }


}

module.exports = Block