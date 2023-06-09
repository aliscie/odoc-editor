"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertItem = exports.topParentIndex = void 0;
function checkChildren(targetId, children) {
    for (var i = 0; i < children.length; i++) {
        var item = children[i];
        if (item.id === targetId) {
            return i;
        }
        if (item.children) {
            var childIndex = checkChildren(targetId, item.children);
            if (childIndex !== -1) {
                return childIndex;
            }
        }
    }
    return -1;
}
function topParentIndex(targetId, data) {
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (item.id === targetId) {
            return i;
        }
        if (item.children) {
            var childIndex = checkChildren(targetId, item.children);
            if (childIndex !== -1) {
                return i;
            }
        }
    }
    return -1;
}
exports.topParentIndex = topParentIndex;
function insertItem(targetId, data, new_item) {
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (item.id === targetId) {
            // TODO Why they show empty or somtimes just one child despite there are many childs?
            //     let followElements = data.splice(i );
            //      console.log("followElements",followElements);
            //         new_item.children = [...new_item.children, ...followElements];
            data.splice(i + 1, 0, new_item);
            return i;
        }
        if (item.children) {
            var index = insertItem(targetId, item.children, new_item);
            if (index !== -1) {
                return index;
            }
        }
    }
    return -1;
}
exports.insertItem = insertItem;
//# sourceMappingURL=parent_index.js.map