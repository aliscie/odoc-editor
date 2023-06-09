"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeItemAtIndex = void 0;
function removeItemAtIndex(arr, index) {
    if (index < 0 || index >= arr.length) {
        throw new Error('Index out of bounds');
    }
    return __spreadArray(__spreadArray([], arr.slice(0, index), true), arr.slice(index + 1), true);
}
exports.removeItemAtIndex = removeItemAtIndex;
//# sourceMappingURL=remove_at_Index.js.map