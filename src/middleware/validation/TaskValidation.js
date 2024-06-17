import { body } from "express-validator";
import Todo from "../../models/Task.js";

export default [
  // task
  body("content")
    .notEmpty()
    .withMessage("The task field is required")
    .bail()
    .isLength({ min: 2 })
    .withMessage("The task has to have a minimum length of 2 character")
    .bail()
    .custom((value, { req }) => {
      return Todo.query()
        .findOne({ content: value })
        .where("user_id", req.user.id)
        .then((existingTask) => {
          if (existingTask) {
            return Promise.reject("This task already exists");
          }
        });
    }),
];
