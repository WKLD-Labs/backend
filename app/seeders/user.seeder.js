// Import necessary modules and set up Sequelize
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

// Import the User model
const db = require("../models");
const User = db.user;

// Seed users function
exports.seedUsers = async () => {
    try {
        // Sync the User model with the database
        await User.sync();

        // Hash passwords and create users
        const adminExists = await User.findOne({ where: { username: 'admin' } });

        if (!adminExists) {
            // Hash passwords and create users
            const users = [
                {
                    name: 'Admin',
                    username: 'admin',
                    password: 'password', // Please note this is a plain text password
                },
                // Add more users as needed
            ];
            const hashedUsers = await Promise.all(users.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, 12);
                return {
                    ...user,
                    password: hashedPassword,
                };
            }));

            // Bulk create seeded users
            await User.bulkCreate(hashedUsers);
            console.log('Users seeded successfully');
        }


    } catch (error) {
        console.error('Error seeding users:', error);
    }
};

