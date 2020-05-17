'use strict'

const User = use('App/Models/User')
const Config = use('Config')

class AuthService {
  async authenticate({ email, password }, auth) {
    const { token } = await auth.attempt(email, password)
    if (token) {
      const user = await User.findBy('email', email)
      return {
        user,
        token,
      }
    }
  }
}

module.exports = new AuthService(Config)
