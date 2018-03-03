'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('events', [

      { title: 'A sudden event', description: 'Sudden but somehow planned. Who would have thought.', startdate: 'NOW()', enddate: 'NOW()'},

      { title: 'A great event', description: 'Not bad if you enjoy having a great time. Better not miss it.', , startdate: 'NOW()', enddate: 'NOW()' },

      { title: 'Some awesome Time',  description: 'Is somewhat like watching Napoleon Dynamite with beer and pizza. Definetly go there.', startdate: 'NOW()', enddate: 'NOW()' }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('events', null, {});
  }
};
