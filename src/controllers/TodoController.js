import Category from "../models/Category.js";
import Task from "../models/Task.js";
import { validationResult } from "express-validator";
import dotenv from "dotenv";
dotenv.config();

export const home = async (req, res) => {
  const slug = req.params.category || "Default";

  // get tasks in specific category
  const [category] = await Category.query().where("name", slug);
  const tasks = (await Task.query().where("user_id", req.user.id)).filter(
    (task) => task.category_id === category.id
  );

  // get categories for sidebar
  const categories = await Category.query();

  // get flash message if available
  const flash = req.flash || "";
  res.render("home", {
    tasks: tasks,
    category,
    categories,
    user: req.user,
    flash,
  });
};

export const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.formErrorFields = {};
    errors.array().forEach((err) => {
      req.formErrorFields[err.path] = err.msg;
    });

    // get tasks in specific category
    const slug = req.params.category || "Default";
    const [category] = await Category.query().where("name", slug);
    const tasks = (await Task.query().where("user_id", req.user.id)).filter(
      (task) => task.category_id === category.id
    );

    // get categories for sidebar
    const categories = await Category.query();

    res.render("home", {
      tasks: tasks,
      category,
      categories,
      user: req.user,
      err: req.formErrorFields.content,
    });
    return;
  } else {
    const task = await Task.query().insert({
      content: req.body.content,
      category_id: parseInt(req.body.category_id),
      user_id: req.user.id,
    });
  }
  const category = await Category.query().findById(req.body.category_id);
  res.redirect(category.slug);
};

export const update = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.formErrorFields = {};
    errors.array().forEach((err) => {
      req.formErrorFields[err.path] = err.msg;
    });

    req.flash = {
      type: "danger",
      message: `Task field is empty or task already exists`,
    };
    next();
  } else {
    const taskId = req.body.id;
    let task = await Task.query()
      .findById(taskId)
      .where("user_id", req.user.id)
      .first();

    if (task) {
      task = await Task.query().patchAndFetchById(taskId, {
        content: req.body.content,
      });

      const category = await Category.query().findById(task.category_id);
      if (category) {
        return res.redirect(category.slug);
      } else {
        return res.redirect("/");
      }
    } else {
      // Task not found or does not belong to the user
      return res.redirect("/");
    }
  }
};

export const destroy = async (req, res) => {
  const taskId = req.body.id;
  let task = await Task.query()
    .findById(taskId)
    .andWhere("user_id", req.user.id);
  if (task) {
    // get category for redirect
    const category = await Category.query().findById(task.category_id);
    // delete task
    task = await Task.query().deleteById(taskId);
    if (category) {
      return res.redirect(category.slug);
    } else {
      return res.redirect("/");
    }
  } else {
    return res.redirect("/");
  }
};

export const isDone = async (req, res) => {
  const taskId = req.body.id;
  const task = await Task.query()
    .findById(taskId)
    .where("user_id", req.user.id);
  if (task) {
    const updateTask = await Task.query().patchAndFetchById(taskId, {
      is_done: task.is_done ? false : true,
    });

    // get category for redirect
    const category = await Category.query().findById(task.category_id);
    if (category) {
      res.redirect(category.slug);
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/");
  }
};

export const createCategory = async (req, res) => {
  const category = await Category.query().insert({
    name: req.body.name,
    slug: `/${req.body.name}`,
  });
  res.redirect(`/${req.body.name}`);
};

export const postTask = async (req, res, next) => {
  // check errors and show in browser
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.formErrorFields = {};
    errors.array().forEach((error) => {
      req.formErrorFields[error.path] = error.msg;
    });

    // set flash message
    req.flash = {
      type: "danger",
      message: "Er zijn fouten gevonden in je formulier",
    };

    // show errors in browser via the contact page
    return next();
  } else {
    req.flash = {
      type: "success",
      message: "Task is made successfully",
    };
    next();
  }
};

export const handlePost = async (req, res, next) => {
  const method = req.body.method;
  const is_done = req.body.isDone;
  const category = req.body.category;

  if (method == "POST") {
    create(req, res);
  }
  if (method == "PUT") {
    update(req, res, next);
  }
  if (method == "DELETE") {
    destroy(req, res);
  }
  if (is_done === "PUT") {
    isDone(req, res);
  }
  if (category == "POST") {
    createCategory(req, res);
  }
};
