function checkChildren(targetId: string, children: any[]): number {

    for (let i = 0; i < children.length; i++) {
        const item = children[i];
        if (item.id === targetId) {
            return i;
        }
        if (item.children) {
            const childIndex = checkChildren(targetId, item.children);
            if (childIndex !== -1) {
                return childIndex;
            }
        }
    }
    return -1;
}

export function topParentIndex(targetId: string, data: any[]): number {
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        if (item.id === targetId) {
            return i;
        }
        if (item.children) {
            const childIndex = checkChildren(targetId, item.children);
            if (childIndex !== -1) {
                return i;
            }
        }
    }
    return -1;
}

export function insertItem(targetId: string, data: any[], new_item: any): number {
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        if (item.id === targetId) {
            // TODO Why they show empty or somtimes just one child despite there are many childs?
            //     let followElements = data.splice(i );
            //      console.log("followElements",followElements);
            //         new_item.children = [...new_item.children, ...followElements];
            data.splice(i + 1, 0, new_item);
            return i;
        }
        if (item.children) {
            const index = insertItem(targetId, item.children, new_item);
            if (index !== -1) {
                return index;
            }
        }
    }
    return -1;
}
