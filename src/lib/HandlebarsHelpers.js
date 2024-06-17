/*
    This library contains custom Handlebars helpers 
    that can be used in the Handlebars templates

*/

import Handlebars from "handlebars";

import handlebarsHelpers from "handlebars-helpers";
const handyHelpers = handlebarsHelpers();

const myHelpers = {
  task: function (placeholder, name, disabled, value) {
    return new Handlebars.SafeString(
      `
        <input
          type="text"
          name="${name}"
          ${disabled}
          class="input-field"
          placeholder="${placeholder}"
          value="${value.fn(this)}"
        />
        `
    );
  },
  button: function (type, className, svg) {
    return new Handlebars.SafeString(
      `<button class="btn ${className}" type="${type}">${svg.fn(this)}</button>`
    );
  },
};

export default { ...handyHelpers, ...myHelpers };
