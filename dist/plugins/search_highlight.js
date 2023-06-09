"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var slate_1 = require("slate");
var SearchHighlightingExample = function (search) {
    var decorate = (0, react_1.useCallback)(
    // @ts-ignore
    function (_a) {
        var node = _a[0], path = _a[1];
        var ranges = [];
        if (search && slate_1.Text.isText(node)) {
            var text = node.text;
            var parts = text.split(search);
            var offset_1 = 0;
            parts.forEach(function (part, i) {
                if (i !== 0) {
                    ranges.push({
                        anchor: { path: path, offset: offset_1 - search.length },
                        focus: { path: path, offset: offset_1 },
                        highlight: true,
                    });
                }
                offset_1 = offset_1 + part.length + search.length;
            });
        }
        return ranges;
    }, [search]);
    return { decorate: decorate };
};
// @ts-ignore
exports.default = SearchHighlightingExample;
//# sourceMappingURL=search_highlight.js.map