const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
  title: String,
  description: String,
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "Project",
  },
});

const Task = model("Task", taskSchema);

module.exports = Task;
