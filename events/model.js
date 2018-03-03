const Sequelize = require('sequelize')
const sequelize = require('../db')

// Model without date limitation / range

const Events = sequelize.define('event', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  },
  startdate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  enddate: Sequelize.DATE
  }, {
  tableName: 'events',
  timestamps: false
})


module.exports = Events
