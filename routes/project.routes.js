// const express = require('express')
// counst router = express.Router()
const router = require("express").Router();
const Project = require("../models/Project.model");

router.post("/projects", async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const newProject = await Project.create({
      title,
      description,
      tasks: [],
    });

    res.status(201).json(newProject);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//GET all projects

router.get("/projects", async (req, res, next) => {
  try {
    const allProjects = await Project.find();

    res.status(200).json(allProjects);
  } catch (error) {
    console.error(error);
  }
});

router.post("/projects/test", async (req, res, next) => {
  const { ids } = req.body;

  try {
    const allProjects = await Project.find({
      _id: {
        $in: ids,
      },
    });

    `Some items don't have enough quantity: ${errorArray
      .map(service => `${service.title}, available: ${service.quantity}`)
      .join(", ")}`;
    res.status(200).json(allProjects);
  } catch (error) {
    console.error(error);
  }
});

router.get("/projects/search", async (req, res, next) => {
  const { price, color } = req.query;
  try {
    const allProjects = await Project.find({ price, color });

    res.status(200).json(allProjects);
  } catch (error) {
    console.error(error);
  }
});

// Get by id

router.get("/projects/:projectId", async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const singleProject = await Project.findById(projectId).populate("tasks");

    res.status(200).json(singleProject);
  } catch (error) {
    console.error(error);
  }
});

router.put("/projects/:projectId", async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { title, description } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      {
        title,
        description,
      },
      { new: true }
    );

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error(error);
  }
});

router.put("/favorites/:userId/:productId", async (req, res, next) => {
  try {
    const { productId, userId } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        //$set will either add or remove the id depending if it's there already
        // push to push, pull to remove
        $set: {
          favoriteProducts: productId,
        },
      },
      { new: true }
    );

    // for the review, do the same as above but also delete he review afterwards
    // await Review.findByIdAndDelete(reviewId)
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
  }
});

router.delete("/projects/:projectId", async (req, res, next) => {
  try {
    const { projectId } = req.params;

    await Project.findByIdAndDelete(projectId);

    res.status(204).send();
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
