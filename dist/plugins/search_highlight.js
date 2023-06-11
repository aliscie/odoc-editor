"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const slate_1 = require("slate");
const SearchHighlightingExample = (search) => {
    const decorate = (0, react_1.useCallback)(
    // @ts-ignore
    ([node, path]) => {
        const ranges = [];
        if (search && slate_1.Text.isText(node)) {
            const { text } = node;
            const parts = text.split(search);
            let offset = 0;
            parts.forEach((part, i) => {
                if (i !== 0) {
                    ranges.push({
                        anchor: { path, offset: offset - search.length },
                        focus: { path, offset },
                        highlight: true,
                    });
                }
                offset = offset + part.length + search.length;
            });
        }
        return ranges;
    }, [search]);
    return { decorate };
};
// @ts-ignore
exports.default = SearchHighlightingExample;
//# sourceMappingURL=search_highlight.js.map