const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    name:{type: String, required:true},
    email:{type: String, required: true},
    feedbackText: { type: String, required: true },
    category: { type: String, enum: ['Suggestion', 'Bug Report', 'Feature Request'], default: 'Suggestion' },
    createdAt: { type: Date, default: Date.now }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;