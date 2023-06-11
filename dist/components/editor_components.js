"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Portal = exports.Menu = exports.Icon = exports.Button = void 0;
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const css_1 = require("@emotion/css");
exports.Button = react_1.default.forwardRef(({ className, active, reversed, ...props }, ref) => (react_1.default.createElement("span", { ...props, ref: ref, style: { color: active ? "white" : "gray", cursor: "pointer" } })));
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
exports.Icon = react_1.default.forwardRef(({ className, ...props }, ref) => (react_1.default.createElement("span", { ...props, ref: ref, className: (0, css_1.cx)('material-icons', className, (0, css_1.css) `
                  font-size: 18px;
                  vertical-align: text-bottom;
                `) })));
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
exports.Menu = react_1.default.forwardRef(({ className, ...props }, ref) => (react_1.default.createElement("div", { ...props, "data-test-id": "menu", ref: ref, className: (0, css_1.cx)(className, (0, css_1.css) `
                  & > * {
                    display: inline-block;
                  }

                  & > * + * {
                    margin-left: 15px;
                  }
                `) })));
const Portal = ({ children }) => {
    return typeof document === 'object'
        ? react_dom_1.default.createPortal(children, document.body)
        : null;
};
exports.Portal = Portal;
// export const Toolbar = React.forwardRef(
//     (
//         {className, ...props}: PropsWithChildren<BaseProps>,
//         ref: Ref<OrNull<HTMLDivElement>>
//     ) => (
//         <Menu
//             {...props}
//             ref={ref}
//             className={cx(
//                 className,
//                 css`
//                   position: relative;
//                   padding: 1px 18px 17px;
//                   margin: 0 -20px;
//                   border-bottom: 2px solid #eee;
//                   margin-bottom: 20px;
//                 `
//             )}
//         />
//     )
// )
//# sourceMappingURL=editor_components.js.map