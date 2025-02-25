const Project = require("../main_models/project");
const User = require("../main_models/user");
const Task = require("../main_models/task")

exports.allProjectTasks = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const tasks = await Task.find({ projectId });
        res.status(201).json({ tasks });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.createTask = async (req, res) => {
    try {
        const { title, description, projectId, assignedTo, priority, status, deadline } = req.body;
        const project = await Project.findById({ _id: projectId });
        if (!project)
            return res.status(403).json({ message: "Requested project doesn't exist" });

        const teammember = await User.findById({ _id: assignedTo })

        if (!teammember || teammember.role !== "teammember")
            return res.status(403).json({ message: "Either the user doesn't exist or the user doesn't exist with the teammember role" });


        const task = new Task({ title, description, projectId, assignedTo, priority, status, deadline });

        project.tasks.push(task._id);
        teammember.tasks.push(task._id);

        await project.save();
        await task.save();
        await teammember.save();


        res.status(201).json({ message: "Task added successfully", task });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.deleteTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task)
            return res.status(403).json({ message: "Requested task doesn't exist" });

        await Project.findByIdAndUpdate(task.projectId, { $pull: { tasks: task._id } });

        await User.findByIdAndUpdate(task.assignedTo, { $pull: { tasks: task._id } });

        await Task.findByIdAndDelete(req.params.id);

        res.status(201).json({ message: "Task is deleted successfully" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.updateTaskDetails = async (req, res) => {
    try {
        const { title, description, projectId, assignedTo, priority, status, deadline } = req.body
        const taskId = await Task.findById(req.params.id);

        if (!taskId)
            return res.status(404).json({ message: "Requested project doesn't exist" });

        await Task.findByIdAndUpdate({ _id: req.params.id }, { title: title, description: description, projectId: projectId, assignedTo: assignedTo, priority: priority, status: status, deadline: deadline }, { new: true });

        res.status(201).json({ message: "updated successfully" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}