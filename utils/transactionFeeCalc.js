const convert = require('ether-converter')
const hexToDecConvert = require('./hexToDecConvert')

const transactionFeeCalc = (gas, gasPrice) => {
  const weiGasLimit = hexToDecConvert(gas)
  const weiGasPrice = hexToDecConvert(gasPrice)
  const transactionFee = weiGasLimit * weiGasPrice
  const convertedToEthFee = convert(transactionFee, 'wei')

  return Number(convertedToEthFee.ether).toFixed(9)
}

module.exports = transactionFeeCalc
