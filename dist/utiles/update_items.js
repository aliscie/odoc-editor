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
exports.updateItem = void 0;
var updateItem = function (id, data, newValues) {
    return data.map(function (item) {
        if (item.id === id) {
            return __assign(__assign({}, item), newValues);
        }
        if (item.children) {
            return __assign(__assign({}, item), { children: (0, exports.updateItem)(id, item.children, newValues) });
        }
        return item;
    });
};
exports.updateItem = updateItem;
//# sourceMappingURL=update_items.js.map