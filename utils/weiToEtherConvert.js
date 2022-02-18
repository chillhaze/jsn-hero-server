const convert = require('ether-converter')
const hexToDecConvert = require('./hexToDecConvert')

const weiToEtherConvert = value => {
  const wei = hexToDecConvert(value)
  const ether = convert(wei, 'wei')

  return Number(ether.ether).toFixed(14)
}

module.exports = weiToEtherConvert
