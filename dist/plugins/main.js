"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var toolbar_1 = require("./toolbar");
var plugins = function (editor) {
    return [
        (0, jsx_runtime_1.jsx)(toolbar_1.HoveringToolbar, {})
    ];
};
exports.default = plugins;
//# sourceMappingURL=main.js.map