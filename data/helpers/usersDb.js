const knex = require('knex')

const dbConfig = require('../../knexfile')
const db = knex(dbConfig.development)

module.exports = {
  getUser: (id) => {
    if(id) {
      return db('users').where('id',id).first()
    }
    return db('users').select('username')
  },

  deleteUser: (id) => {
    return db('users').where('id', id).del()
  },
  // updating user needs password verification
  updateUser: (id, user) => {
    return db('users').where('id', id).update(user)
  }
}