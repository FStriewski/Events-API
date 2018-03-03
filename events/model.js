const Sequelize = require('sequelize')
const sequelize = require('../db')

// Model without date limitation / range

const Event = sequelize.define('event', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  },
  startDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  endDate: Sequelize.DATE,
  allowNull: false
}, {
  tableName: 'events',
  timestamps: false
})


module.exports = Event
