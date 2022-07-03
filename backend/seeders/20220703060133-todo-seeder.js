"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("todos", [
      {
        title: "start coding",
        description: "start coding nextJs",
        status: "inprogress",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
      },
      {
        title: "Exercise",
        description: "Excercise for atleast one hour",
        status: "todo",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
      },
      {
        title: "Get breakfast from ubereats",
        description: "ubereats order will arrive at 8.30am",
        status: "done",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("todos", {}, null);
  },
};
