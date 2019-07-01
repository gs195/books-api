const Sequelize = require("sequelize");

const currentEnv = process.env.NODE_ENV || 'development'; //refer to scripts start in package.json

if(currentEnv === 'production'){
    const sequelize = new Sequelize(process.env.DATABASE_URL, { dialect: "postgres" })
} else {
    //create instance, this can only connect to local db, not production db
    const sequelize = new Sequelize("booksapi", "postgres", "", {
      dialect: "postgres"
    });
}

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
