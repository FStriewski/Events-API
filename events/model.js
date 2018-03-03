const Sequelize = require('sequelize')
const sequelize = require('../db')

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
    defaultValue: Sequelize.NOW,
    validate: {    }
  },
  enddate: {
    type: Sequelize.DATE
  //  defaultValue: Sequelize.NOW,
  //  validate: {    }
  }
},{
  timestamps: false,
  createdAt: false,
  updatedAt: false,
  validate: {
    compareStartToEnd() {
         // if (this.startdate < new Date){
         //   throw new Error('StartDate is the past!')
         // }
      if (this.enddate < this.startdate){
        throw new Error('EndDate is smaller than StartDate!')
      }
    }
  }
 },
  {
  tableName: 'events',
  timestamps: false
})


module.exports = Events
