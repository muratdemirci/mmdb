const time_convert_h_min = (num) => {
  const hours = Math.floor(num / 60)
  const minutes = num % 60
  return ' ' + hours + 'h ' + minutes + 'min'
}

const getAge = (dateString) => {
  // deathday is not null, add another case etc...
  const today = new Date()
  const birthDate = new Date(dateString)
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

module.exports = {
  time_convert_h_min,
  getAge
}
