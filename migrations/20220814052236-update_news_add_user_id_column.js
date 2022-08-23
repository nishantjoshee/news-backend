"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      "news", // name of Source model
      "user_id", // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        after: "featured_image",
        references: {
          model: "users", // name of Target model
          key: "id", // key in Target model that we're referencing
        },
        onUpdate: "SET NULL",
        onDelete: "SET NULL",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("news", "user_id");
  },
};
