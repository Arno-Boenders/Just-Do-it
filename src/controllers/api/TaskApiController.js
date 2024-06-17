import Task from "../../models/Task.js";

export const getTask = async (req, res, next) => {
  const id = req.params.id;
  const task = await Task.query().findById(id);
  res.json({
    task,
  });
};

export const getTasks = async (req, res, next) => {
  const tasks = await Task.query();
  res.json({
    tasks,
  });
};

export const createTask = async (req, res, next) => {
  // get tasks from the request body
  const content = req.body.content;
  const user_id = req.user.id;
  const category_id = req.body.category_id;
  
  // validate the tasks
  if (!content || !user_id || !category_id) {
    res.status(400).json({
      message: "The required information is missing",
    });
  }

  // create the tasks
  const createTask = await Task.query().insert({
    content,
    user_id,
    category_id,
  });

  res.json({
    message: "Task created",
    interest: createTask,
  });
};

export const updateTask = async (req, res, next) => {
  // step 1: validate if id & name are present in the request body
  if (
    !req.body.id ||
    !req.body.content
  ) {
    res.status(400).json({
      message: "id and content are required",
    });
    return;
  }

  // step 2: check if the interest with id exists
  const id = req.body.id;
  const tasks = await Task.query().findById(id).where("user_id", req.user.id);
  if (!tasks) {
    res.status(404).json({
      message: "Task not found",
    });
    return;
  }

  // step 3: check if no other interest with the same name exists
  const content = req.body.content;

  const existingInterest = await Task.query()
    .where("content", content)
    .first();
  if (existingInterest) {
    res.status(400).json({
      message: "Task with the same content already exists",
    });
    return;
  }

  // step 4: update the interest with id
  const updatedUser = await Task.query().patchAndFetchById(id, {
    content,
  });

  // step 5: return the updated interest
  res.json({
    message: "Task has been updated",
    interest: updatedUser,
  });
};

export const deleteTask = async (req, res, next) => {
  const id = req.params.id;

  const deleted = await Task.query().deleteById(id).where("user_id", req.user.id);
  if (deleted) {
    res.json({
      message: "Task deleted",
    });
  } else {
    res.status(404).json({
      message: `Task with id ${id} not found`,
    });
  }
};
