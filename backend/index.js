import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to Project Application.');
});

// Route for saving a new User
app.post('/user', async (request, response) => {
    try {
        if (!request.body.gender || !request.body.name || !request.body.location) {
            return response.status(400).send({
                message: 'Send all required fields: gender, name, location',
            });
        }
        const newUser = {
            gender: request.body.gender,
            name: request.body.name,
            location: request.body.location,
        };

        const user = await user.create(newUser);

        return response.status(201).send(user);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Get All Users from database
app.get('/user', async (request, response) => {
    try {
        const users = await User.find({});

        return response.status(200).json({
            count: users.length,
            data: users
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });