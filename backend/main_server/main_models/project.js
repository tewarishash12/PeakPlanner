const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    teamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
    deadline: { type: Date, required: true }
});

module.exports = mongoose.model('Project', projectSchema);
