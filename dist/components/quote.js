"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quote = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
require("./style.css");
function Quote(props) {
    var _a, _b, _c;
    var ref = react_1.default.useRef(null);
    var content = ((_a = ref.current) === null || _a === void 0 ? void 0 : _a.textContent) || "";
    if (content.length == 0) {
        (_b = ref.current) === null || _b === void 0 ? void 0 : _b.setAttribute('data-empty', 'true');
    }
    else {
        (_c = ref.current) === null || _c === void 0 ? void 0 : _c.setAttribute('data-empty', 'false');
    }
    return ((0, jsx_runtime_1.jsx)("span", { 
        //
        id: props.id, style: { margin: 0, color: "lightgreen" }, ref: ref, placeholder: "enter somthing...", children: props.children }));
}
exports.Quote = Quote;
//# sourceMappingURL=quote.js.map