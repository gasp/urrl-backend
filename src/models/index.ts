import { Sequelize } from 'sequelize'
import { LinkModel } from './link.js'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3',
  logging: console.log,
})

export const Link = LinkModel(sequelize)
