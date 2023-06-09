"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var slate_react_1 = require("slate-react");
var slate_1 = require("slate");
var slate_history_1 = require("slate-history");
var toolbar_1 = require("../plugins/toolbar");
var main_1 = __importDefault(require("../plugins/main"));
var search_highlight_1 = __importDefault(require("../plugins/search_highlight"));
var css_1 = require("@emotion/css");
require("./style/main.css");
var Editor = function (props) {
    var editor = (0, react_1.useMemo)(function () { return (0, slate_history_1.withHistory)((0, slate_react_1.withReact)((0, slate_1.createEditor)())); }, []);
    var decorate = (0, search_highlight_1.default)(props.search || "").decorate;
    return ((0, jsx_runtime_1.jsxs)(slate_react_1.Slate, { editor: editor, initialValue: props.data, children: [(0, jsx_runtime_1.jsx)("h1", { children: "helloxxx" }), (0, main_1.default)(), (0, jsx_runtime_1.jsx)(slate_react_1.Editable, { decorate: decorate, 
                // renderElement={props => <Element {...props} />}
                renderLeaf: function (props) { return (0, jsx_runtime_1.jsx)(Leaf, __assign({}, props)); }, placeholder: "Enter some text...", onDOMBeforeInput: function (event) {
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
                } })] }));
};
// @ts-ignore
var Leaf = function (_a) {
    var attributes = _a.attributes, children = _a.children, leaf = _a.leaf;
    if (leaf.bold) {
        children = (0, jsx_runtime_1.jsx)("strong", { children: children });
    }
    if (leaf.italic) {
        children = (0, jsx_runtime_1.jsx)("em", { children: children });
    }
    if (leaf.underlined) {
        children = (0, jsx_runtime_1.jsx)("u", { children: children });
    }
    return (0, jsx_runtime_1.jsx)("span", __assign({}, attributes, (leaf.highlight && { 'data-cy': 'search-highlighted' }), { className: (0, css_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n          font-weight: ", ";\n          background-color: ", ";\n        "], ["\n          font-weight: ", ";\n          background-color: ", ";\n        "])), leaf.bold && 'bold', leaf.highlight && '#ffeeba'), children: children }));
};
exports.default = Editor;
var templateObject_1;
//# sourceMappingURL=main.js.map