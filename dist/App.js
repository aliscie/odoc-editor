"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("./App.css");
const main_1 = __importDefault(require("./slate_editor/main"));
const initialValue = [
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
    const [search, setSearch] = (0, react_1.useState)();
    return (react_1.default.createElement("div", { className: "App" },
        react_1.default.createElement("header", { className: "App-header" },
            react_1.default.createElement("h1", null, " Editor is here."),
            react_1.default.createElement("input", { onChange: e => setSearch(e.target.value) }),
            react_1.default.createElement(main_1.default, { search: search, data: initialValue }))));
}
exports.default = App;
//# sourceMappingURL=App.js.map