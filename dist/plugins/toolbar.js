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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoveringToolbar = exports.toggleFormat = void 0;
const slate_1 = require("slate");
const react_1 = __importStar(require("react"));
const slate_react_1 = require("slate-react");
const editor_components_1 = require("../components/editor_components");
const css_1 = require("@emotion/css");
const toggleFormat = (editor, format) => {
    const isActive = isFormatActive(editor, format);
    const match = { [format]: isActive ? null : true };
    slate_1.Transforms.setNodes(editor, match, { match: slate_1.Text.isText, split: true });
};
exports.toggleFormat = toggleFormat;
const isFormatActive = (editor, format) => {
    const [match] = slate_1.Editor.nodes(editor, {
        // @ts-ignore
        match: n => n[format] === true,
        mode: 'all',
    });
    return !!match;
};
const HoveringToolbar = () => {
    const ref = (0, react_1.useRef)();
    const editor = (0, slate_react_1.useSlate)();
    const inFocus = (0, slate_react_1.useFocused)();
    (0, react_1.useEffect)(() => {
        const el = ref.current;
        const { selection } = editor;
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
        const domSelection = window.getSelection();
        // @ts-ignore
        const domRange = domSelection.getRangeAt(0);
        const rect = domRange.getBoundingClientRect();
        el.style.opacity = '1';
        el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
        el.style.left = `${rect.left +
            window.pageXOffset -
            el.offsetWidth / 2 +
            rect.width / 2}px`;
    });
    return (react_1.default.createElement(editor_components_1.Portal, null,
        react_1.default.createElement(editor_components_1.Menu, { ref: ref, className: (0, css_1.css) `
                  padding: 8px 7px 6px;
                  position: absolute;
                  z-index: 1;
                  top: -10000px;
                  left: -10000px;
                  margin-top: -6px;
                  opacity: 0;
                  background-color: #222;
                  border-radius: 4px;
                  transition: opacity 0.75s;
                `, onMouseDown: (e) => {
                // prevent toolbar from taking focus away from editor
                e.preventDefault();
            } },
            react_1.default.createElement(FormatButton, { format: "bold", icon: "B" }),
            react_1.default.createElement(FormatButton, { format: "italic", icon: "I" }),
            react_1.default.createElement(FormatButton, { format: "underlined", icon: "U" }))));
};
exports.HoveringToolbar = HoveringToolbar;
// @ts-ignore
const FormatButton = ({ format, icon }) => {
    const editor = (0, slate_react_1.useSlate)();
    return (react_1.default.createElement(editor_components_1.Button, { reversed: true, active: isFormatActive(editor, format), onClick: () => (0, exports.toggleFormat)(editor, format) },
        react_1.default.createElement(editor_components_1.Icon, null, icon)));
};
//# sourceMappingURL=toolbar.js.map