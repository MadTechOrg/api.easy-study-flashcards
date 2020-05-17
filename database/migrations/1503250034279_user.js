'use strict'

/* @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.uuid('id').primary()
      table.string('name', 80).notNullable()
      table.string('email', 80).notNullable().unique()
      table.string('password', 60).notNullable()
      table.date('birth_date').nullable()
      table.string('gender', 1).nullable()
      table.string('photo_url').nullable()
      table.string('language', 10).notNullable().defaultTo('en')
      table.json('notification').nullable().defaultTo('[]')
      table.json('frequency').notNullable().defaultTo('[]')
      table.string('provider_id').nullable()
      table.string('provider_name').nullable()
      table.boolean('first_login').notNullable().defaultTo(true)
      table.boolean('premium').notNullable().defaultTo(false)
      table.timestamps()
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
