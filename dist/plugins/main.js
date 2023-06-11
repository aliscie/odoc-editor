"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const toolbar_1 = require("./toolbar");
let plugins = (editor) => {
    return [
        react_1.default.createElement(toolbar_1.HoveringToolbar, null)
    ];
};
exports.default = plugins;
//# sourceMappingURL=main.js.map