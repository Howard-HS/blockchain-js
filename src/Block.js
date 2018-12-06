const uuid = require('uuid')

class Block {
  // Initialize a new block
  constructor (data, parentId) {
    this.data = data
    this.id = uuid()
    this.parentId = parentId
  }

  // Returns an object containing the block's id information
  getIds () {
    return {
      id: this.id,
      parentId: this.parentId
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