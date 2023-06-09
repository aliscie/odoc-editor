"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var quote_1 = require("./components/quote");
var RendererProps = /** @class */ (function () {
    function RendererProps() {
    }
    return RendererProps;
}());
function EditorRenderer(props) {
    var tag = props.tag, content = props.content, _a = props.attributes, attributes = _a === void 0 ? {} : _a, children = props.children;
    var Tag = tag || "span";
    switch (tag) {
        case "quote":
            return (0, jsx_runtime_1.jsx)(quote_1.Quote, __assign({}, props, { children: children }));
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
            return ((0, jsx_runtime_1.jsx)(Tag, __assign({ style: { margin: 0 } }, props, { placeholder: "enter somthing..." }, attributes, { children: children })));
    }
}
exports.default = EditorRenderer;
//# sourceMappingURL=element_renderer.js.map