"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = void 0;
function generateId() {
    return "id_" + Math.random().toString(36).substring(2, 15);
}
exports.generateId = generateId;
//# sourceMappingURL=generate_id.js.map