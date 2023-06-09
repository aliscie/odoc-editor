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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toolbar = exports.Portal = exports.Menu = exports.Icon = exports.Button = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var css_1 = require("@emotion/css");
exports.Button = react_1.default.forwardRef(function (_a, ref) {
    var className = _a.className, active = _a.active, reversed = _a.reversed, props = __rest(_a, ["className", "active", "reversed"]);
    return ((0, jsx_runtime_1.jsx)("span", __assign({}, props, { ref: ref, className: (0, css_1.cx)(className, (0, css_1.css)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n                  cursor: pointer;\n                  color: ", ";\n                "], ["\n                  cursor: pointer;\n                  color: ", ";\n                "])), reversed
            ? active
                ? 'white'
                : '#aaa'
            : active
                ? 'black'
                : '#ccc')) })));
});
// export const EditorValue = React.forwardRef(
//     (
//         {
//             className,
//             value,
//             ...props
//         }: PropsWithChildren<
//             {
//                 value: any
//             } & BaseProps
//         >,
//         ref: any
//     ) => {
//         const textLines = value.document.nodes
//             .map((node: any) => node.text)
//             .toArray()
//             .join('\n')
//         return (
//             <div
//                 ref={ref}
//                 {...props}
//                 className={cx(
//                     className,
//                     css`
//                       margin: 30px -20px 0;
//                     `
//                 )}
//             >
//                 <div
//                     className={css`
//                       font-size: 14px;
//                       padding: 5px 20px;
//                       color: #404040;
//                       border-top: 2px solid #eeeeee;
//                       background: #f8f8f8;
//                     `}
//                 >
//                     Slate's value as text
//                 </div>
//                 <div
//                     className={css`
//                       color: #404040;
//                       font: 12px monospace;
//                       white-space: pre-wrap;
//                       padding: 10px 20px;
//
//                       div {
//                         margin: 0 0 0.5em;
//                       }
//                     `}
//                 >
//                     {textLines}
//                 </div>
//             </div>
//         )
//     }
// )
exports.Icon = react_1.default.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)("span", __assign({}, props, { ref: ref, className: (0, css_1.cx)('material-icons', className, (0, css_1.css)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n                  font-size: 18px;\n                  vertical-align: text-bottom;\n                "], ["\n                  font-size: 18px;\n                  vertical-align: text-bottom;\n                "])))) })));
});
// export const Instruction = React.forwardRef(
//     (
//         {className, ...props}: PropsWithChildren<BaseProps>,
//         ref: any
//     ) => (
//         <div
//             {...props}
//             ref={ref}
//             className={cx(
//                 className,
//                 css`
//                   white-space: pre-wrap;
//                   margin: 0 -20px 10px;
//                   padding: 10px 20px;
//                   font-size: 14px;
//                   background: #f8f8e8;
//                 `
//             )}
//         />
//     )
// )
exports.Menu = react_1.default.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)("div", __assign({}, props, { "data-test-id": "menu", ref: ref, className: (0, css_1.cx)(className, (0, css_1.css)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n                  & > * {\n                    display: inline-block;\n                  }\n\n                  & > * + * {\n                    margin-left: 15px;\n                  }\n                "], ["\n                  & > * {\n                    display: inline-block;\n                  }\n\n                  & > * + * {\n                    margin-left: 15px;\n                  }\n                "])))) })));
});
var Portal = function (_a) {
    var children = _a.children;
    return typeof document === 'object'
        ? react_dom_1.default.createPortal(children, document.body)
        : null;
};
exports.Portal = Portal;
exports.Toolbar = react_1.default.forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(exports.Menu, __assign({}, props, { ref: ref, className: (0, css_1.cx)(className, (0, css_1.css)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n                  position: relative;\n                  padding: 1px 18px 17px;\n                  margin: 0 -20px;\n                  border-bottom: 2px solid #eee;\n                  margin-bottom: 20px;\n                "], ["\n                  position: relative;\n                  padding: 1px 18px 17px;\n                  margin: 0 -20px;\n                  border-bottom: 2px solid #eee;\n                  margin-bottom: 20px;\n                "])))) })));
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=editor_components.js.map