"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoveringToolbar = exports.toggleFormat = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var slate_1 = require("slate");
var react_1 = require("react");
var slate_react_1 = require("slate-react");
var editor_components_1 = require("../components/editor_components");
var css_1 = require("@emotion/css");
var toggleFormat = function (editor, format) {
    var _a;
    var isActive = isFormatActive(editor, format);
    slate_1.Transforms.setNodes(editor, (_a = {}, _a[format] = isActive ? null : true, _a), { match: slate_1.Text.isText, split: true });
};
exports.toggleFormat = toggleFormat;
var isFormatActive = function (editor, format) {
    // @ts-ignore
    var match = slate_1.Editor.nodes(editor, {
        // @ts-ignore
        match: function (n) { return n[format] === true; },
        mode: 'all',
    })[0];
    return !!match;
};
var HoveringToolbar = function () {
    var ref = (0, react_1.useRef)();
    var editor = (0, slate_react_1.useSlate)();
    var inFocus = (0, slate_react_1.useFocused)();
    (0, react_1.useEffect)(function () {
        var el = ref.current;
        var selection = editor.selection;
        if (!el) {
            return;
        }
        if (!selection ||
            !inFocus ||
            slate_1.Range.isCollapsed(selection) ||
            slate_1.Editor.string(editor, selection) === '') {
            el.removeAttribute('style');
            return;
        }
        var domSelection = window.getSelection();
        // @ts-ignore
        var domRange = domSelection.getRangeAt(0);
        var rect = domRange.getBoundingClientRect();
        el.style.opacity = '1';
        el.style.top = "".concat(rect.top + window.pageYOffset - el.offsetHeight, "px");
        el.style.left = "".concat(rect.left +
            window.pageXOffset -
            el.offsetWidth / 2 +
            rect.width / 2, "px");
    });
    return ((0, jsx_runtime_1.jsx)(editor_components_1.Portal, { children: (0, jsx_runtime_1.jsxs)(editor_components_1.Menu, { ref: ref, className: (0, css_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n                  padding: 8px 7px 6px;\n                  position: absolute;\n                  z-index: 1;\n                  top: -10000px;\n                  left: -10000px;\n                  margin-top: -6px;\n                  opacity: 0;\n                  background-color: #222;\n                  border-radius: 4px;\n                  transition: opacity 0.75s;\n                "], ["\n                  padding: 8px 7px 6px;\n                  position: absolute;\n                  z-index: 1;\n                  top: -10000px;\n                  left: -10000px;\n                  margin-top: -6px;\n                  opacity: 0;\n                  background-color: #222;\n                  border-radius: 4px;\n                  transition: opacity 0.75s;\n                "]))), onMouseDown: function (e) {
                // prevent toolbar from taking focus away from editor
                e.preventDefault();
            }, children: [(0, jsx_runtime_1.jsx)(FormatButton, { format: "bold", icon: "B" }), (0, jsx_runtime_1.jsx)(FormatButton, { format: "italic", icon: "I" }), (0, jsx_runtime_1.jsx)(FormatButton, { format: "underlined", icon: "U" })] }) }));
};
exports.HoveringToolbar = HoveringToolbar;
// @ts-ignore
var FormatButton = function (_a) {
    var format = _a.format, icon = _a.icon;
    var editor = (0, slate_react_1.useSlate)();
    return ((0, jsx_runtime_1.jsx)(editor_components_1.Button, { reversed: true, active: isFormatActive(editor, format), onClick: function () { return (0, exports.toggleFormat)(editor, format); }, children: (0, jsx_runtime_1.jsx)(editor_components_1.Icon, { children: icon }) }));
};
var templateObject_1;
//# sourceMappingURL=toolbar.js.map