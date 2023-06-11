"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const quote_1 = require("./components/quote");
class RendererProps {
}
function EditorRenderer(props) {
    const { tag, content, attributes = {}, children } = props;
    let Tag = tag || "span";
    switch (tag) {
        case "quote":
            return react_1.default.createElement(quote_1.Quote, { ...props }, children);
        // case "table":
        //     return <table/>;
        // case "image":
        //     return <img/>;
        // case "video":
        //     return <video/>;
        // case "audio":
        //     return <audio/>;
        // case "link":
        //     return <a/>;
        // case "code":
        //     return <code/>;
        // case "math":
        //     return <math/>;
        // case "list":
        //     return <ul/>;
        // case "code":
        //     return <code/>;
        default:
            return (react_1.default.createElement(Tag, { style: { margin: 0 }, ...props, placeholder: "enter somthing...", ...attributes }, children));
    }
}
exports.default = EditorRenderer;
//# sourceMappingURL=element_renderer.js.map