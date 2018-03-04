'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
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
        allowNull: false
      },
      enddate: {
        type: Sequelize.DATE
      },{
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        validate: {
          validateDateInput() {
            if (this.startdate < new Date ){
                  throw new Error('StartDate is the past!')
            }
            if (this.enddate < this.startdate){
              throw new Error('EndDate is smaller than StartDate!')
            }
          }
        }
       }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('events');
  }
};
