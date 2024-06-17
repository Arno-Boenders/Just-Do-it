import knex from "../lib/Knex.js";
import { Model } from "objection";

// instantiate the model
Model.knex(knex);

import Task from "./Task.js";

class Category extends Model {
  static get tableName() {
    return "categories";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 3 },
        slug: { type: "string" },
      },
    };
  }
  static get relationMappings() {
    return {
      tasks: {
        relation: Model.HasManyRelation,
        modelClass: Task,
        join: {
          from: "categories.id",
          to: "tasks.category_id",
        },
      },
    };
  }
}

export default Category;
