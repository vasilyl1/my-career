const User = require('./User');
const Goal = require('./Goal');
const Comment = require('./Comment');

Goal.hasMany(Comment, {
  foreignKey: 'goalId'
});

Comment.belongsTo(Goal, {
  foreignKey: 'goalId'
});

User.hasMany(Comment, {
  foreignKey: 'userId'
});

Comment.belongsTo(User, {
  foreignKey: 'userId'
});

User.hasMany(Goal, {
  foreignKey: 'userId'
});

Goal.belongsTo(User, {
  foreignKey: 'userId'
});

module.exports = { User, Goal, Comment };