const path = require('path')

require('dotenv').config({
  path: path.resolve('.env')
})

const Blockchain = require('./src/Blockchain')
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

