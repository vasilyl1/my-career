const User = require('./User');
const Goal = require('./Goal');
const Comment = require('./Comment');

Goal.hasMany(Comment, {
  foreignKey: 'goal_id'
});

Comment.belongsTo(Goal, {
  foreignKey: 'goal_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Goal, {
  foreignKey: 'user_id'
});

Goal.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Goal, Comment };