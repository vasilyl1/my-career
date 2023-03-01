const sequelize = require('../config/connection');
const seedGoal = require('./goalsData');
const seedComment = require('./commentData');
const seedUser = require('./userData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedGoal();

  await seedComment();

  process.exit(0);
};

seedAll();
