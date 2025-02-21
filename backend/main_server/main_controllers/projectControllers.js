const Project = require("../main_models/project");
const User = require("../main_models/user");

exports.allProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate('assignedTo teamMembers');
        res.status(201).json({ projects });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.createProject = async (req,res) =>{
    try {
        const userId = await User.findOne({_id: req.body.assignedTo});
        console.log(userId)
        if(!userId || userId.role!=='manager')
            return res.status(403).json({message: "The manager who is assigned to project doesn't exist"})
        
        const project = new Project(req.body);
        console.log(project);
        await project.save();

        await User.findByIdAndUpdate({_id:req.body.assignedTo}, {$addToSet: {projects: project._id}})

        res.status(201).json({message: "Project added successfully"})
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}

exports.deleteProjectById = async(req,res) =>{
    try {
        const projectId = await Project.findById(req.params.id);
        if(!projectId)
            return res.status(403).json({message: "Requested project doesn't exist" })
        await Project.findByIdAndDelete(req.params.id);

        await User.findByIdAndUpdate({_id:req.body.assignedTo}, {$pull: {projects: req.params.id}})

        res.status(201).json({message:"Project is deleted successfully"})
    } catch(err) {
        res.status(500).json({message:err.message})
    }
}

exports.updateProjectDetails = async (req,res) =>{
    try {
        const { title,teamMembers,tasks,status,deadline } = req.body;
        const projectId = req.params.id;
        const project = await Project.findById(projectId);
        
        if (!project)
            return res.status(404).json({ message: "Requested project doesn't exist" });

        if (teamMembers) {
            project.teamMembers = [...new Set([...project.teamMembers, ...teamMembers])];
        }

        project.title = title || project.title;
        project.tasks = tasks || project.tasks;
        project.status = status || project.status;
        project.deadline = deadline || project.deadline;

        await project.save();

        res.status(201).json({message: "updated successfully"})
    } catch(err) {
        res.status(500).json({message:err.message})
    }
}