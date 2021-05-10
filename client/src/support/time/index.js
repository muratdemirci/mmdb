const time_convert_h_min = (num) => {
  const hours = Math.floor(num / 60)
  const minutes = num % 60
  return ' ' + hours + 'h ' + minutes + 'min'
}

module.exports = {
  time_convert_h_min
}
