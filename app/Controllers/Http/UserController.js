'use strict'

const User = use('App/Models/User')
const { validateAll } = use('Validator')

class UserController {
  async create({ request, response }) {
    try {
      const errorMessages = {
        'name.required': 'required_field',
        'name.min': 'min_length_2',
        'email.required': 'required_field',
        'email.email': 'invalid_email',
        'email.unique': 'instance_already_exists',
        'password.required': 'required_field',
        'password.min': 'min_length_6',
      }

      const validation = await validateAll(request.all(), {
        name: 'required|min:2',
        email: 'required|email|unique:users',
        password: 'required|min:6',
      }, errorMessages)

      if (validation.fails()) {
        return response.status(400).send({ message: validation.messages() })
      }

      const data = request.only(['name', 'email', 'password', 'providerId', 'providerName'])
      const user = await User.create(data)
      return user
    } catch (err) {
      return response.status(400).send({ error: `Error: ${err.message}` })
    }
  }
}

module.exports = UserController
