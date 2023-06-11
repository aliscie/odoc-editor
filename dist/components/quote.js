"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quote = void 0;
const react_1 = __importDefault(require("react"));
require("./style.css");
function Quote(props) {
    let ref = react_1.default.useRef(null);
    let content = ref.current?.textContent || "";
    if (content.length == 0) {
        ref.current?.setAttribute('data-empty', 'true');
    }
    else {
        ref.current?.setAttribute('data-empty', 'false');
    }
    return (react_1.default.createElement("span", { 
        //
        id: props.id, style: { margin: 0, color: "lightgreen" }, ref: ref, placeholder: "enter somthing..." }, props.children));
}
exports.Quote = Quote;
//# sourceMappingURL=quote.js.map