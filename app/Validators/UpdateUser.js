'use strict'

const { rule, configure, formatters } = use('Validator')

configure({
  FORMATTER: formatters.JsonApi,
})

class UpdateUser {
  get rules() {
    return {
      name: 'min:2',
      birth_date: [
        rule('date'),
        rule('dateFormat', 'YYYY-MM-DD'),
      ],
      language: 'string',
      gender: 'in:M,F,O',
      photo_url: 'string',
      first_login: 'boolean',
    }
  }

  get messages() {
    return {
      'birth_date.dateFormat': 'date should be in format "YYYY-MM-DD"',
    }
  }

  get validateAll() {
    return true
  }
}

module.exports = UpdateUser
