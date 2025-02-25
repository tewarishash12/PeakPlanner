const router = require("express").Router();

const { allProjectTasks, createTask, deleteTaskById, updateTaskDetails } = require("../main_controllers/taskControllers");

router.get('/projectId/:projectId', allProjectTasks);

router.post('/projectId/:projectId', createTask);

router.delete("/id/:id", deleteTaskById);

router.patch("/id/:id", updateTaskDetails);

module.exports = router;