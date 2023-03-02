const { User } = require('../models');

const seedUser = async () => {
    await User.create({ // using create method instead of bulkcreate to launch the hooks for encryption
        username: 'John Doe',
        email: 'abc@abc.com',
        password: 'password123',
        advisor: false,
    });
   await User.create({ // using create method instead of bulkcreate to launch the hooks for encryption
        username: 'Peter The Professional',
        email: 'abc1@abc.com',
        password: 'password123',
        advisor: true,
    });
    await User.create({ // using create method instead of bulkcreate to launch the hooks for encryption
        username: 'text-davinci-003',
        email: 'abc2@abc.com',
        password: 'password123',
        advisor: true,
    });

};

module.exports = seedUser;