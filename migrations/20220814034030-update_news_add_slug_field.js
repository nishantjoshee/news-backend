"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      "news", // name of Source model
      "slug", // name of the key we're adding
      {
        type: Sequelize.STRING,
        after: "title",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("news", "slug");
  },
};
