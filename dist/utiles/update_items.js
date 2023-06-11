"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItem = void 0;
const updateItem = (id, data, newValues) => {
    return data.map((item) => {
        if (item.id === id) {
            return {
                ...item,
                ...newValues,
            };
        }
        if (item.children) {
            return {
                ...item,
                children: (0, exports.updateItem)(id, item.children, newValues),
            };
        }
        return item;
    });
};
exports.updateItem = updateItem;
//# sourceMappingURL=update_items.js.map