"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("news", "client_id", {
      type: Sequelize.INTEGER,
      after: "user_id",
      references: {
        model: "clients",
        key: "id",
      },
      onUpdate: "SET NULL",
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("news", "client_id");
  },
};
