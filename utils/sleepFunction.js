function sleepFunction(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

module.exports = sleepFunction
