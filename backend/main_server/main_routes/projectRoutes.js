const router = require("express").Router();

const { allProjects,createProject,deleteProjectById,updateProjectDetails } = require("../main_controllers/projectControllers");

router.get('/', allProjects);

router.post('/', createProject);

router.delete("/id/:id", deleteProjectById);

router.patch("/id/:id", updateProjectDetails);

module.exports = router;