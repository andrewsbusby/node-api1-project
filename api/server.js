// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model');

const server = express();

server.use(express.json());

// FIND ALL USERS
server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).json({message: "The users information could not be retrieved"})
        })
})

//FIND USER BY ID
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params
    User.findById(id)
        .then(user => {
            if(!user) {
                res.status(404).json({message: "The user with the specified ID does not exist"})
            }
            res.json(user)
        })
        .catch(err => {
            res.status(500).json({
                message: "The user information could not be retrieved"
            })
        })
})

//CREATE NEW USER   
server.post('/api/users', (req, res) => {
    const { name, bio } = req.body
    User.insert({ name, bio })
        .then(newUser => {
            if(!newUser) {
                res.status(400).json({
                    message: "Please provide name and bio for the user"
                })
            } else {
                res.status(201).json(newUser);
            }
        })
        .catch(err =>{
            res.status(500).json({
                message: "There was an error while saving the user to the database"
            })
        })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
