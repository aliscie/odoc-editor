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
const slate_react_1 = require("slate-react");
const slate_1 = require("slate");
const slate_history_1 = require("slate-history");
const toolbar_1 = require("../plugins/toolbar");
const main_1 = __importDefault(require("../plugins/main"));
const search_highlight_1 = __importDefault(require("../plugins/search_highlight"));
const css_1 = require("@emotion/css");
require("./style/main.css");
const Editor = (props) => {
    const editor = (0, react_1.useMemo)(() => (0, slate_history_1.withHistory)((0, slate_react_1.withReact)((0, slate_1.createEditor)())), []);
    let { decorate } = (0, search_highlight_1.default)(props.searchOptions || "", props.search || "");
    return (react_1.default.createElement(slate_react_1.Slate, { editor: editor, initialValue: props.data },
        react_1.default.createElement("h1", null, "helloxxx"),
        (0, main_1.default)(),
        react_1.default.createElement(slate_react_1.Editable, { decorate: decorate, 
            // renderElement={props => <Element {...props} />}
            renderLeaf: props => react_1.default.createElement(Leaf, { ...props }), placeholder: "Enter some text...", onDOMBeforeInput: (event) => {
                switch (event.inputType) {
                    case 'formatBold':
                        event.preventDefault();
                        return (0, toolbar_1.toggleFormat)(editor, 'bold');
                    case 'formatItalic':
                        event.preventDefault();
                        return (0, toolbar_1.toggleFormat)(editor, 'italic');
                    case 'formatUnderline':
                        event.preventDefault();
                        return (0, toolbar_1.toggleFormat)(editor, 'underlined');
                }
            } })));
};
// @ts-ignore
const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
        children = react_1.default.createElement("strong", null, children);
    }
    if (leaf.italic) {
        children = react_1.default.createElement("em", null, children);
    }
    if (leaf.underlined) {
        children = react_1.default.createElement("u", null, children);
    }
    return react_1.default.createElement("span", { ...attributes, ...(leaf.highlight && { 'data-cy': 'search-highlighted' }), className: (0, css_1.css) `
          font-weight: ${leaf.bold && 'bold'};
          background-color: ${leaf.highlight && '#ffeeba'};
        ` }, children);
};
exports.default = Editor;
//# sourceMappingURL=main.js.map