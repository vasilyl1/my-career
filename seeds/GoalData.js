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
  },
  {
    name: 'personal objective 4 - acquire full stack developer skills',
    body: 'Attend UofT bootcamp, make sure you ask many questions to the instructor, TAs and tutors ',
    date: 'December 01, 2022 09:00:00',
    userId: 1
  },
  {
    name: 'personal objective 5 - acquire full stack developer skills',
    body: 'Attend UofT bootcamp, make sure you ask many questions to the instructor, TAs and tutors ',
    date: 'December 01, 2022 09:00:00',
    userId: 1,
    advice: 2 // requested advisor 2 review
  },
  {
    name: 'personal objective 6 - acquire full stack developer skills',
    body: 'Attend UofT bootcamp, make sure you ask many questions to the instructor, TAs and tutors ',
    date: 'December 01, 2022 09:00:00',
    userId: 1
  },
  {
    name: 'personal objective 7 - acquire full stack developer skills',
    body: 'Attend UofT bootcamp, make sure you ask many questions to the instructor, TAs and tutors ',
    date: 'December 01, 2022 09:00:00',
    userId: 1,
    advice: 2 // requested advisor 2 review
  },
  {
    name: 'personal objective 8 - acquire full stack developer skills',
    body: 'Attend UofT bootcamp, make sure you ask many questions to the instructor, TAs and tutors ',
    date: 'December 01, 2022 09:00:00',
    userId: 1
  },
  {
    name: 'personal objective 9 - acquire full stack developer skills',
    body: 'Attend UofT bootcamp, make sure you ask many questions to the instructor, TAs and tutors ',
    date: 'December 01, 2022 09:00:00',
    userId: 1
  },
  {
    name: 'personal objective 10 - acquire full stack developer skills',
    body: 'Attend UofT bootcamp, make sure you ask many questions to the instructor, TAs and tutors ',
    date: 'December 01, 2022 09:00:00',
    userId: 1,
    advice: 2 // requested advisor 2 review
  },
  {
    name: 'personal objective 11 - acquire full stack developer skills',
    body: 'Attend UofT bootcamp, make sure you ask many questions to the instructor, TAs and tutors ',
    date: 'December 01, 2022 09:00:00',
    userId: 1
  },
  {
    name: 'personal objective 12 - acquire full stack developer skills',
    body: 'Attend UofT bootcamp, make sure you ask many questions to the instructor, TAs and tutors ',
    date: 'December 01, 2022 09:00:00',
    userId: 1,
    advice: 2 // requested advisor 2 review
  },
  {
    name: 'personal objective 13 - acquire full stack developer skills',
    body: 'Attend UofT bootcamp, make sure you ask many questions to the instructor, TAs and tutors ',
    date: 'December 01, 2022 09:00:00',
    userId: 1
  },
  {
    name: 'personal objective 14 - acquire full stack developer skills',
    body: 'Attend UofT bootcamp, make sure you ask many questions to the instructor, TAs and tutors ',
    date: 'December 01, 2022 09:00:00',
    userId: 1,
    advice: 2 // requested advisor 2 review
  },
  {
    name: 'personal objective 15 - acquire full stack developer skills',
    body: 'Attend UofT bootcamp, make sure you ask many questions to the instructor, TAs and tutors ',
    date: 'December 01, 2022 09:00:00',
    userId: 1
  },
  {
    name: 'personal objective 16 - acquire full stack developer skills',
    body: 'Attend UofT bootcamp, make sure you ask many questions to the instructor, TAs and tutors ',
    date: 'December 01, 2022 09:00:00',
    userId: 1
  }
];

const seedGoal = () => Goal.bulkCreate(goaldata);


module.exports = seedGoal;
