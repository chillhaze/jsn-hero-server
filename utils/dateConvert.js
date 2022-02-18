const dateConvert = timestamp => {
  const dateString = Date(parseInt(timestamp, 16)).toString()

  return dateString.split(' ').slice(1, 4).join('-')
}

module.exports = dateConvert
