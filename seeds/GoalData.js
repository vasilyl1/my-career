const { Goal } = require('../models');

const goaldata = [
  {
    name: 'personal objective 1 - acquire full stack developer skills',
    body: 'Attend UofT bootcamp, make sure you ask many questions to the instructor, TAs and tutors ',
    date: 'December 01, 2022 09:00:00',
    userId: 1
  },
  {
    name: 'Personal objective 2 - weekly golf club',
    body: 'Professional goals for golf, maintain relationships, annual membership budget',
    date: 'January 12, 2023 17:00:00',
    userId: 1,
    advice: 2 // requested advisor 2 review
  },
  {
    name: 'Personal objective 3 - career development',
    body: 'job related professional objective',
    date: 'January 13, 2023 17:00:00',
    userId: 2
  }
];

const seedGoal = () => Goal.bulkCreate(goaldata);


module.exports = seedGoal;
