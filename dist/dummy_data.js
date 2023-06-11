"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _generate_id = require("./utiles/generate_id");
var my_dummies = [{
  tag: 'h3',
  children: [{
    id: "p2",
    content: "hello world"
  }],
  id: "p3"
}, {
  tag: 'p',
  // condition: "if user age >= 18"
  children: [{
    id: "random_id_4",
    content: "loerm ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. loerm ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."
  }],
  id: "random_id_2"
}, {
  tag: 'quote',
  children: [{
    id: "quote_id",
    content: "Hello quote"
  }],
  id: "p_id_3"
}, {
  tag: 'p',
  id: (0, _generate_id.generateId)(),
  children: [{
    id: "random_id_3",
    children: [{
      id: (0, _generate_id.generateId)(),
      type: "leaf",
      content: "sample 1",
      tag: "span"
    }, {
      id: (0, _generate_id.generateId)(),
      type: "leaf",
      content: "sample 2",
      tag: "span"
    }]
  }, {
    id: (0, _generate_id.generateId)(),
    type: "leaf",
    content: "nested child",
    tag: "b"
  }, {
    content: "  more text",
    id: (0, _generate_id.generateId)()
  }]
}];
var _default = my_dummies;
exports.default = _default;