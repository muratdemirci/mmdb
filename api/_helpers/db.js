const mongoose = require('mongoose')
const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}

mongoose.connect(
  process.env.MONGODB_URI,
  connectionOptions,
  (err) => console.log(err || 'MongoDB connected.')
)
mongoose.Promise = global.Promise

// TODO: this should be more dynamic!
module.exports = {
  User: require('users/user.model'),
  RefreshToken: require('users/refresh-token.model'),
  Interest: require('interests/interests.model'),
  isValidId
}
// TODO: this should be more dynamic!

function isValidId (id) {
  return mongoose.Types.ObjectId.isValid(id)
}
