const mongoose = require('mongoose')
const user = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number },
    gender: { type: String },
    height: { type: Number },
    weight: { type: Number },
    fitlevel: { type: String },
    goal: { type: String },
    duration: { type: Number },
    frequency: { type: Number },
    description: { type: String },
    workout_plan: { type: Object }
})

module.exports = mongoose.model("User", user)