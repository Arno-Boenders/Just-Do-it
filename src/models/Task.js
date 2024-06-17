import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

import Category from "./Category.js";
import User from "./User.js";

class Task extends Model {
  static get tableName() {
    return "tasks";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ['content'],
      properties: {
        id: { type: "integer" },
        content: { type: "string" },
        is_done: { type: "boolean" },
        category_id: { type: "integer"}
      },
    };
  }
  static get relationMappings() {
    return {
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: Category,
        join: {
          from: "tasks.category_id",
          to: "categories.id",
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "tasks.user_id",
          to: "users.id",
        },
      },
    };
  }
}

export default Task;
