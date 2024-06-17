import Category from "../models/Category.js";
import Task from "../models/Task.js";
import MailTransporter from "../lib/MailTransporter.js";

export const mail = async (req, res, next) => {
  // get tasks in specific category
  const category = await Category.query().findById(req.body.category_id);
  const tasks = await Task.query().where("category_id", req.body.category_id).andWhere("user_id", req.user.id);

  try {
    MailTransporter.sendMail({
      from: "noreply@justdoit.com",
      to: req.body.email,
      subject: `Tasks in category: ${category.name}`,
      html: `
        <h1>${category.name}</h1> <br> 
      <ul> ${tasks
        .filter((task) => !task.is_done)
        .map((task) => "<li>" + task.content + "</li>")
        .join("")}</ul>
        `,
    });

    // set flash message
    req.flash = {
      type: "success",
      message:
        `Your tasks have been sent to ${req.body.email}`
    };
    next();
  } catch (error) {
    req.flash = {
      type: "danger",
      message:
        "Er is een fout opgetreden bij het versturen van je bericht <br>" +
        error.message,
    };
    next();
  }
};
