// import statements
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { create } from "express-handlebars";
import { PORT, VIEWS_PATH } from "./constants.js";
import HandlebarsHelpers from "./lib/HandlebarsHelpers.js";

// import parsers
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

// import Controllers
import * as AuthController from "./controllers/AuthController.js";
import * as TodoController from "./controllers/TodoController.js";
import * as MailController from "./controllers/MailController.js";
import * as TaskApiController from "./controllers/api/TaskApiController.js";
import * as CategoriesApiController from "./controllers/api/CategoriesApiController.js";
import * as AuthApiController from "./controllers/api/AuthApiController.js";

// import middleware
import AuthRegisterValidation from "./middleware/validation/AuthRegisterValidation.js";
import AuthLoginValidation from "./middleware/validation/AuthLoginValidation.js";
import TaskValidation from "./middleware/validation/TaskValidation.js";
import jwtAuth from "./middleware/jwtAuth.js";

// app setup
const app = express();

// make use of the cookie parser 🍪 middleware
app.use(cookieParser());

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// publicly available files
app.use(express.static("public"));

// ----------------------------- Handlebars configuration --------------------------------

const hbs = create({
  extname: ".hbs",
  defaultLayout: "main",
  helpers: HandlebarsHelpers,
});

// set handlebars as the view engine
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", VIEWS_PATH); // location of the handlebars files

// ----------------------------- End of Handlebars configuration --------------------------------

// Auth routes
app.get("/login", AuthController.login);
app.get("/register", AuthController.register);
app.get("/logout", AuthController.logout);

app.post(
  "/register",
  AuthRegisterValidation,
  AuthController.postRegister,
  AuthController.register
);

app.post(
  "/login",
  AuthLoginValidation,
  AuthController.postLogin,
  AuthController.login
);

app.post("/logout", AuthController.postLogout, AuthController.logout);

// routes
app.get("/", jwtAuth, TodoController.home);
app.get("/:category", jwtAuth, TodoController.home);
app.post(
  "/task",
  jwtAuth,
  TaskValidation,
  TodoController.handlePost,
  TodoController.home
);
app.post("/mail", jwtAuth, MailController.mail, TodoController.home);

// ----------------------------- API routes --------------------------------
// api tasks
app.get("/api/task/:id", jwtAuth, TaskApiController.getTask);
app.get("/api/task", jwtAuth, TaskApiController.getTasks);
app.post("/api/task", jwtAuth, TaskApiController.createTask);
app.put("/api/task", jwtAuth, TaskApiController.updateTask);
app.delete("/api/task/:id", jwtAuth, TaskApiController.deleteTask);

// api categories
app.get("/api/category/:id", CategoriesApiController.getCategory);
app.get("/api/category", CategoriesApiController.getCategories);

// api login
app.post("/api/login", AuthLoginValidation, AuthApiController.login);

// api register
app.post(
  "/api/register",
  AuthRegisterValidation,
  AuthApiController.postRegister,
  AuthApiController.register
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
