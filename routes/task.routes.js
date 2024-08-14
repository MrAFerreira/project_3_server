const router = require("express").Router();
const Task = require("../models/Task.model");
const Project = require("../models/Project.model");

router.post("/tasks", async (req, res, next) => {
  try {
    const { title, description, projectId } = req.body;

    //Create a new task
    const newTask = await Task.create({ title, description, projectId });

    // Add the task to the project
    const updatedProject = await Project.findByIdAndUpdate(projectId, {
      $push: {
        tasks: newTask._id,
      },
    });
    //project.tasks.push(newTask._id)

    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
