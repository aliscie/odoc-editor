"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
require("./App.css");
var main_1 = __importDefault(require("./slate_editor/main"));
var initialValue = [
    {
        type: 'paragraph',
        children: [
            {
                text: 'This example shows how you can make a hovering menu appear above your content, which you can use to make text ',
            },
            { text: 'bold', bold: true },
            { text: ', ' },
            { text: 'italic', italic: true },
            { text: ', or anything else you might want to do!' },
        ],
    },
    {
        type: 'paragraph',
        children: [
            { text: 'Try it out yourself! Just ' },
            { text: 'select any piece of text and the menu will appear', bold: true },
            { text: '.' },
        ],
    },
];
function App() {
    var _a = (0, react_1.useState)(), search = _a[0], setSearch = _a[1];
    return ((0, jsx_runtime_1.jsx)("div", { className: "App", children: (0, jsx_runtime_1.jsxs)("header", { className: "App-header", children: [(0, jsx_runtime_1.jsx)("h1", { children: " Editor is here." }), (0, jsx_runtime_1.jsx)("input", { onChange: function (e) { return setSearch(e.target.value); } }), (0, jsx_runtime_1.jsx)(main_1.default, { search: search, data: initialValue })] }) }));
}
exports.default = App;
//# sourceMappingURL=App.js.map