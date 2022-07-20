const Task = require('../model/taskModel');
const asyncWrapper = require("../middleware/asyncWrapper");
const { createCustomError } = require("../errors/custom-errors")


const getAllTask = asyncWrapper(async (req, res) => {
    const tasks = await Task.find();
    res.status(200).json({ tasks })
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
})

const getTask = asyncWrapper(async (req, res, next) => {
    const { id: taskid } = req.params;
    const task = await Task.findOne({ _id: taskid });
    if (!task) {

        return next(createCustomError(`No task with id : ${taskid}`, 404));
    }
    return res.status(200).json({ task });
})

const updateTask = asyncWrapper(async (req, res) => {
    const { id: taskid } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskid }, req.body, { new: true });
    if (!task) {
        return res.status(404).json({ msg: `Not found this task id ${task}` })
    }
    return res.status(200).json({ task });
})

const deleteTask = asyncWrapper(async (req, res) => {
    const { id: taskid } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskid });
    if (!task) {
        return res.status(404).json({ msg: `Not found this task id ${task}` })
    }
    return res.status(200).json({ task });
})

module.exports = { getAllTask, createTask, getTask, updateTask, deleteTask };