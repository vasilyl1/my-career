const { Comment } = require('../models');

const commentdata = [
  {
    body: 'This is the review for the personal objective 1',
    date: 'February 28, 2023 17:01:00',
    goalId: 1,
    userId: 2
  },
  {
    body: 'I have commented my professional objective myself - reviewed performance',
    date: 'June 26, 2021 11:00:00',
    goalId: 1,
    userId: 1
  },
  {
    body: 'This is something may be very stupid as this is the comment from the AI bot',
    date: 'June 23, 2021 17:00:00',
    goalId: 1,
    userId: 3
  },
  {
    body: 'This is the review for the personal objective 1',
    date: 'February 28, 2023 17:01:00',
    goalId: 2,
    userId: 2
  },
  {
    body: 'I have commented my professional objective myself - reviewed performance',
    date: 'June 26, 2021 11:00:00',
    goalId: 2,
    userId: 1
  },
  {
    body: 'This is something may be very stupid as this is the comment from the AI bot',
    date: 'June 23, 2021 17:00:00',
    goalId: 2,
    userId: 3
  },
  {
    body: 'This is the review for the personal objective 1',
    date: 'February 28, 2023 17:01:00',
    goalId: 3,
    userId: 2
  },
  {
    body: 'I have commented my professional objective myself - reviewed performance',
    date: 'June 26, 2021 11:00:00',
    goalId: 4,
    userId: 1
  }

];

const seedComment = () => Comment.bulkCreate(commentdata);

module.exports = seedComment;