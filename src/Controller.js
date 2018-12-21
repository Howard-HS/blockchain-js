const minimumDifficulty = `0x0${'F'.repeat(63)}`
const lvl1 = `0x00${'F'.repeat(62)}`
const lvl2 = `0x000${'F'.repeat(61)}`
const lvl3 = `0x0000${'F'.repeat(60)}`
const lvl4 = `0x00000${'F'.repeat(59)}`
const lvl5 = `0x000000${'F'.repeat(58)}`
const minimumTime = 5000
const maximumTime = 10000

let currentLevel = 0

// calculate difficulty
// average of time for 5 blocks to compute must within the max min time
function computeDifficulty(chain) {
  if (chain.length < 5 && currentLevel === 0) {
    return minimumDifficulty
  } else {
    const currentChain = chain.slice(-5)
    const totalComputeTime = currentChain.reduce((acc, cur) => {
      return acc + cur.getComputeTime()
    }, 0)

    const averageTime = totalComputeTime / 5

    if (averageTime >= maximumTime) {
      currentLevel++
      switch (currentLevel) {
        case 1:
          return lvl1
        case 2:
          return lvl2
        case 3:
          return lvl3
        case 4:
          return lvl4
        case 5:
          return lvl5
      }
    } else {
      currentLevel--
      switch (currentLevel) {
        case 1:
          return lvl1
        case 2:
          return lvl2
        case 3:
          return lvl3
        case 4:
          return lvl4
        case 5:
          return lvl5
      }
    }
    
  }
}

class Controller {
  constructor() {
    this.chain = null
  }

  getDifficulty() {
    return computeDifficulty(this.chain)
  }

  passChain(chain) {
    this.chain = chain
  }
}

module.exports = Controller
