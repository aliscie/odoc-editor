"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeItemAtIndex = void 0;
function removeItemAtIndex(arr, index) {
    if (index < 0 || index >= arr.length) {
        throw new Error('Index out of bounds');
    }
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
exports.removeItemAtIndex = removeItemAtIndex;
//# sourceMappingURL=remove_at_Index.js.map