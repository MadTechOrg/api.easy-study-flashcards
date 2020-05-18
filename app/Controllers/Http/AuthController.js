'use strict'

const UserService = use('App/Services/UserService')
const AuthService = use('App/Services/AuthService')

class AuthController {
  constructor() {
    this.userService = UserService
    this.authService = AuthService
  }

  async register({ request, response, auth }) {
    const data = request.only(['name', 'email', 'password', 'providerId', 'providerName'])
    await this.userService.store(data)
    const authentication = await this.authService.authenticate(
      {
        email: data.email,
        password: data.password,
      },
      auth,
    )
    return response.json(authentication)
  }

  async login({ request, response, auth }) {
    const { email, password } = request.all()
    const authentication = await this.authService.authenticate({ email, password }, auth)
    return response.json(authentication)
  }

  async forgot({ request }) {
    const email = request.input('email')
    await this.authService.forgot(email)
  }

  async reset({ request }) {
    const data = request.only(['token', 'password'])
    await this.authService.reset(data)
  }
}

module.exports = AuthController
