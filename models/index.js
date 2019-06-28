const Sequelize = require("sequelize");

//create instance
const sequelize = new Sequelize("booksapi", "postgres", "", {
  dialect: "postgres"
});

//initialize models
const models = {
  Book: sequelize.import("./book"),
  Author: sequelize.import("./author")
};

//call association method in each model
Object.keys(models).forEach(key => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

module.exports = {
  sequelize,
  ...models
};
