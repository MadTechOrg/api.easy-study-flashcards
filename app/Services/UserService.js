'use strict'

const Config = use('Config')
const User = use('App/Models/User')
const BadRequestException = use('App/Exceptions/BadRequestException')
const NotFoundException = use('App/Exceptions/NotFoundException')

class UserService {
  async store(attributes) {
    try {
      return User.create(attributes)
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async update(userId, attributes) {
    try {
      await User.query().where('id', userId).update(attributes)
      return User.find(userId)
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async show(userId) {
    try {
      return User.find(userId)
    } catch (error) {
      throw new NotFoundException()
    }
  }
}

module.exports = new UserService(Config)
